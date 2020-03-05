import ast
import random
import requests

from config import GOOGLE_API_KEY_ID
from .constants import (
    DESCRIPTION_DEBUT_SENTENCE,
    GOOGLE_API_BASE_URL_FIND_PLACE,
    GOOGLE_API_BASE_URL_GET_COORDINATES,
    NO_ANECDOTE_SENTENCE,
    NO_FOUND_SENTENCE,
    STOP_WORDS,
    WIKIPEDIA_API_BASE_URL
)


class PlaceInformations:

    def __init__(self, sentence):
        self._address = None
        self._coordinates = None
        self._description = None
        self._response = None
        self._sentence = sentence
        self._parsed_input_message = self.sentence_parser()


    def get_address(self):
        """
        """
        self.retrieve_address()
        return self._address

    def get_coordinates(self):
        """
        """
        self.retrieve_coordinates()
        return self._coordinates
    
    def get_description(self):
        """
        """
        self.retrieve_coordinates()
        return self._description

    def sentence_parser(self):
        """
        Parse the sentence given in parameter to get only the important words

        Arguments:
            sentence - str
                Sentence in raw version (with stop words).
        Returns
        -------
            structured_sentence - str
                Sentence parsed (without stop words).
        """
        # Replace all quotes and hyphens with space.
        self._sentence = self._sentence.lower().replace('\'', ' ').replace('-', ' ')
        # Join all the words with + instead space for an url compatibility
        # If the words are not stop words.
        structured_sentence = '+'.join([
            word
            for word in self._sentence.split()
            if word not in STOP_WORDS
        ])

        return structured_sentence

    def call(self, url, parameters):
        """
        Make a API Call to the url and with the parameters given.
        Put in _response attribute the json result of the api call.
        Exemple :
            - candidates which contains the data.
            - status which contains the status result response.

        Parameters
        ----------
        url : str
            URL where the api call will be sent.

        parameters: dict
            Parameters to get an accurate result. 

        Returns
        -------
        : json
            Response.   
        """
        return requests.get(url, parameters).json()

    def retrieve_address(self):
        """
        Retrieve an address from a sentence if there are no result remove each
        of 5 first words one by one and try to get a result.
        """
        parameters = {
            'key': GOOGLE_API_KEY_ID,
            'input': self._parsed_input_message,
            'inputtype': 'textquery',
            'fields': 'formatted_address'
        }
        input_message = self._parsed_input_message.split('+')
        word_counter = 5
        # Iterate on the sentence to get a result.
        while True:
            response = self.call(GOOGLE_API_BASE_URL_FIND_PLACE, parameters)
            if response['status'] == 'ZERO_RESULTS' and word_counter:
                parameters['input'] = '+'.join(input_message[word_counter:])
                word_counter -= 1
            else:
                break
        # If there is no convincing result.
        if response.get('status') != 'OK':
            return None
        else:
            self._address = response\
                            .get('candidates')[0]\
                            .get('formatted_address')

    def retrieve_coordinates(self):
        """
        Retrieve the coordinates for an address (latidute, longitude).
        """
        if not self._address:
            return None
        parameters = {
            'key': GOOGLE_API_KEY_ID,
            'address': self._address
        }
        response = self.call(GOOGLE_API_BASE_URL_GET_COORDINATES, parameters)
        response = response.get('results')[0]['geometry']['location']
        # Get the coordinates.
        coordinates = {
            'lng': response['lng'],
            'lat': response['lat']
        }
        self._coordinates = coordinates

    def retrieve_description(self):
        """
        retrieve the description of an address.
        """
        if not self._coordinates:
            return random.choice(NO_FOUND_SENTENCE)
        page_title = None
        page_id = None
        parameters = {
            "format": "json",
            "action": 'query',
            "list": "geosearch",
            "gsradius": 10000,
            "gslimit": 10,
            "gscoord": f"{self._coordinates['lat']}|{self._coordinates['lng']}"
        }
        response = self.call(WIKIPEDIA_API_BASE_URL, parameters)
        # If there are founded pages.
        coord = f"{self.get_coordinates()['lat']}|{self.get_coordinates()['lng']}"
        if response['query']['geosearch']:
            # Take the good page.
            address = self.get_address().replace('-', ' ')
            for obj in response.get('query')['geosearch']:
                obj_title = obj['title'].replace('-', ' ')
                if obj_title in address:
                    page_title = obj['title']
                    page_id = obj['pageid']
                    break
            # Get the summary from the page.
            if page_title and page_id:
                parameters = {
                    "format": "json",
                    "origin": "*",
                    "generator": "search",
                    "prop": "extracts",
                    "gsrsearch": page_title,
                    "exintro": 1,
                    "explaintext": 1,
                    "exchars": 800,
                    "exlimit": 20,
                    "action": 'query'
                }
                response = self.call(WIKIPEDIA_API_BASE_URL, parameters)
                self._description = response['query']['pages'][str(page_id)]['extract']

        if self._description:
            self._description = random.choice(DESCRIPTION_DEBUT_SENTENCE) + ' ' + self._description
        elif not self._description and self._address:
            self._description = random.choice(NO_ANECDOTE_SENTENCE)
        else:
            self._description = random.choice(NO_FOUND_SENTENCE)
