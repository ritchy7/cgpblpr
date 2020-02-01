import ast
import requests
from collections import namedtuple

from config import GOOGLE_API_KEY_ID
from .constants import (
    GOOGLE_API_BASE_URL_FIND_PLACE,
    GOOGLE_API_BASE_URL_GET_COORDINATES,
    STOP_WORDS,
    WIKIPEDIA_API_BASE_URL_FIND_INTRODUCTION
)

class PlaceInformation:

    def __init__(self, sentence):
        self.coordinates = None
        self.description = None
        self.response = None
        self.sentence = sentence
        self.parsed_input_message = self.parser_killer()
        self.address = self.get_address()

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
        response = ast.literal_eval(requests.get(url=url, params=parameters)._content.decode('utf-8'))
        self.response = response
        return response

    def get_description(self):
        """
        Get the description of an address.
        """
        res = requests.get(url=WIKIPEDIA_API_BASE_URL_FIND_INTRODUCTION,
                           params={
                               "format": "json",
                               "action": 'query',
                               "list": "geosearch",
                               "gsradius": 10000,
                               "gslimit": 10,
                               "gscoord": f"{self.coordinates['lng']}|{self.coordinates['lat']}"
                            }
        )
        print('response', f"{self.coordinates['lng']}|{self.coordinates['lat']}")

    def get_coordinates(self):
        """
        Get the coordinates for an address (latidute, longitude).
        """
        url = GOOGLE_API_BASE_URL_GET_COORDINATES
        parameters = {
            'key': GOOGLE_API_KEY_ID,
            'address': ''.join(
                char
                for char in self.response['candidates'][0]['formatted_address']
                if not char.isdigit()
            )
        }
        self.call(url, parameters)
        coordinates = self.response['results'][0]['geometry']['location']
        self.coordinates = {
            'lng': coordinates['lng'],
            'lat': coordinates['lat']
        }
        self.get_description()


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
            'input': self.parsed_input_message,
            'inputtype': 'textquery',
            'fields': 'formatted_address'
        }
        input_message = self.parsed_input_message.split('+')
        word_counter = 1
        while self.call(url, parameters)['status'] == 'ZERO_RESULTS' and word_counter <= len(input_message) / 2:
            parameters['input'] = '+'.join(input_message[word_counter:])
            word_counter += 1
        if self.response['status'] != 'OK':
            response = ""
        else:
            response = self.response['candidates'][0]['formatted_address']
            self.get_coordinates()
        return response

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
        self.sentence = self.sentence.lower().replace('\'', ' ').replace('-', ' ')
        structured_sentence = '+'.join([
            word
            for word in self.sentence.split()
            if word not in STOP_WORDS
        ])

        return structured_sentence
