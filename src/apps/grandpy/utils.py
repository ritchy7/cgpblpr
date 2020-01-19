import ast
import requests

from config import GOOGLE_API_KEY_ID
from .constants import GOOGLE_API_BASE_URL, STOP_WORDS

class PlaceInformation:

    def __init__(self, sentence):
        self.sentence = sentence
        self.status = None
        self.input_message = self.parser_killer()
        self.parameters = {
	        "key"   : GOOGLE_API_KEY_ID,
            "input" : self.input_message
        }
        self.url = GOOGLE_API_BASE_URL
        self.place_reference = self.get_place_reference()


    def get_place_reference(self):
        """
        .
        """
        input_message_array = self.input_message.split('+')
        message_len = len(input_message_array)
        counter = 0
        print(input_message_array)

        while True:
            self.parameters['input'] = self.input_message
            response = requests.get(url=self.url, params=self.parameters)
            response = ast.literal_eval(response._content.decode('utf-8'))
            if response['status'] == "OK":
                self.status = response['status']
                self.place_reference = response['predictions'][0]['reference']
                return response
            else:


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
        structured_sentence = '+'.join([
            word
            for word in self.sentence.lower().split()
            if word not in STOP_WORDS
        ])

        return structured_sentence
