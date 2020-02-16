import ast
import random
import requests
from collections import namedtuple


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
        self._parsed_input_message = self.parser_killer()

    def parser_killer(self):
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

        Parameters
        ----------
        url : str
            URL where the api call will be sent.

        parameters: dict
            Parameters to get an accurate result.

        Returns
        -------
        response : dict
            Response with 2 keys :
                - candidates which contains the data.
                - status which contains the status result reponse.
        """
        # Transform the response into a dictionnary.
        response = ast.literal_eval(requests.get(url, parameters)._content.decode('utf-8'))
        self._response = response
        return response

    def get_address(self):
        """
        Get an address from a sentence if there are no result remove each word
        one by one and try to get a result.

        Returns
        -------
        response : str
            Formatted address or empty result.
        """
        url = GOOGLE_API_BASE_URL_FIND_PLACE
        parameters = {
            'key': GOOGLE_API_KEY_ID,
            'input': self._parsed_input_message,
            'inputtype': 'textquery',
            'fields': 'formatted_address'
        }
        input_message = self._parsed_input_message.split('+')
        word_counter = 1
        # Iterate on the sentence
        while self.call(url, parameters)['status'] == 'ZERO_RESULTS' and word_counter <= len(input_message) / 2:
            parameters['input'] = '+'.join(input_message[word_counter:])
            word_counter += 1
        if self._response['status'] != 'OK':
            return None
        else:
            self._address = self._response['candidates'][0]['formatted_address']
        return self._address

    def get_coordinates(self):
        """
        Get the coordinates for an address (latidute, longitude).
        """
        if not self._address:
            return None
        parameters = {
            'key': GOOGLE_API_KEY_ID,
            'address': self._address
        }
        self.call(GOOGLE_API_BASE_URL_GET_COORDINATES, parameters)
        # Get the coordinates.
        coordinates = self._response['results'][0]['geometry']['location']
        self._coordinates = {
            'lng': coordinates['lng'],
            'lat': coordinates['lat']
        }
        return self._coordinates

    def get_description(self):
        """
        Get the description of an address.
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
        coord = f"{self._coordinates['lat']}|{self._coordinates['lng']}"
        if response['query']['geosearch']:
            # Take the good page.
            address = self._address.replace('-', ' ')
            for obj in response['query']['geosearch']:
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
                    # "gsrlimit": 20,
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
        return self._description
