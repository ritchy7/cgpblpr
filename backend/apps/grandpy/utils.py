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

    @staticmethod
    def get_good_page(response, address):
        """
        Retrieve the good page from an address given.

        Parameters
        ----------
        response : json
            Http response of the previous API call which consisted in having all pages
            within a radius of 100 meters from a given geographic coordinate.
        address : str
            Address on which we'll look for the good page.

        Returns
        -------
        : tuple
            page_title : str
                Page title.
            page_id : int
                Page identifer.
        """
        page_title = None
        page_id = None
        address = address.replace('-', ' ')
        places = response['query']['geosearch']
        # Iterate on each proposed page to get the good page title and number.
        for obj_counter, obj in enumerate(places):
            if page_title and page_id:
                break
            # Get the object.
            obj = places[obj_counter]
            obj_title = obj['title']
            obj_page_id = obj['pageid']
            # Check if the object title is in the address
            if obj_title.replace('-', ' ') in address:
                page_title = obj_title
                page_id = obj_page_id
        return page_title, page_id

    def get_address(self):
        """
        Return an address from a sentence.
        """
        self.retrieve_address()
        return self._address

    def get_coordinates(self):
        """
        Return the coordinates from an address.
        """
        self.retrieve_coordinates()
        return self._coordinates
    
    def get_description(self):
        """
        Return the description from a coordinate.
        """
        self.retrieve_description()
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

    def make_description(self):
        """
        Make up the description according the result.
        """
        if self._description:
            self._description = random.choice(DESCRIPTION_DEBUT_SENTENCE) + ': ' + self._description
        elif not self._description and self._address:
            self._description = random.choice(NO_ANECDOTE_SENTENCE)
        else:
            self._description = random.choice(NO_FOUND_SENTENCE)

    def get_summary(self, page_title, page_id):
        """
        Get the summary of a page from his page title and number.

        Parameters
        ----------
        page_title : str
            Page title.
        page_id : int
            Page identifer.
 
        Returns
        -------
        description : json
            Summary of the page.
        """
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
        print(123456)
        description = response['query']['pages'][str(page_id)]['extract']

        return description

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
        # Iterate on the sentence to get a result.
        for word_counter in range(1, len(input_message) + 1):
            response = self.call(GOOGLE_API_BASE_URL_FIND_PLACE, parameters)
            if response.get('status') != 'ZERO_RESULTS' or word_counter > 10:
                break
            parameters['input'] = '+'.join(input_message[word_counter:])
        # If there is no convincing result.
        if response.get('status') != 'OK':
            return None
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
            self._description = random.choice(NO_FOUND_SENTENCE)
            return None

        coord = f"{self._coordinates['lat']}|{self._coordinates['lng']}"
        parameters = {
            "format": "json",
            "action": 'query',
            "list": "geosearch",
            "gsradius": 100,
            "gslimit": 10,
            "gscoord": coord
        }
        response = self.call(WIKIPEDIA_API_BASE_URL, parameters)
        # If there are founded pages.
        if response['query']['geosearch']:
            # Take the good page.
            page_title, page_id = self.get_good_page(response=response, address=self._address)
            # Get the summary from the page.
            if page_title and page_id:
                description = self.get_summary(page_title, page_id)
                self._description = description
        # Make up the description according the result.
        self.make_description()
