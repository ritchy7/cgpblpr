import json
from unittest import mock, TestCase

from apps.core.views import app
from apps.grandpy.utils import PlaceInformations


class BotResponseTests(TestCase):
    """
    Test all bot responses.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tester = app.test_client(self)

    ################
    # Parser killer
    ################
    def test_should_return_the_sentence_without_remove_any_word(self):
        """
        Keep all the words.
        """
        self.assertEqual("salut", PlaceInformations("salut")._parsed_input_message)
        self.assertEqual("salut+salut", PlaceInformations("SALUT SALUT")._parsed_input_message)
        self.assertEqual("salut+ca+grand+mere", PlaceInformations("salut ca grand mere")._parsed_input_message)

    def test_should_return_the_sentence_without_au_word(self):
        """
        Remove "au" word.
        """
        self.assertEqual("salut+garcon", PlaceInformations("salut au garcon")._parsed_input_message)

    def test_should_return_the_sentence_without_aucun_word(self):
        """
        Remove "aucun" word.
        """
        self.assertEqual("homme", PlaceInformations("aucun homme")._parsed_input_message)

    def test_should_return_the_sentence_without_elle_etait_words(self):
        """
        Remove "elle était" word.
        """
        self.assertEqual("chiante", PlaceInformations("elle était chiante")._parsed_input_message)

    def test_should_not_return_position(self):
        """
        Ensure that the askbot return salut.
        """
        response = self.tester.post('/askbot', data=json.dumps({'message':'.'}))
        response = json.loads(response.data.decode('utf-8'))
        self.assertEqual(None, response['position'])

    ###############
    #  Methods
    ###############
    def test_get_coordinates(self):
        """
        Test the get coordinates method it should return a dictionnary with
        2 keys lng and lat.
        """
        patched_coordinates_result = {
            'results': [{
                'geometry': {
                    'location': {
                        'lat': 48.8747265,
                        'lng': 2.3505517
                    } 
                }
            }],
            'status': 'OK'
        }
        patched_address_result = {
            'candidates': [{
                'formatted_address': '7 Cité Paradis, 75010 Paris, France'
            }],
            'status': 'OK'
        }
        pi = PlaceInformations('openclassrooms ?')
        pi.call = mock.MagicMock(return_value=patched_address_result)
        pi.get_address()
        pi.call = mock.MagicMock(return_value=patched_coordinates_result)
        self.assertEqual(pi.get_coordinates(), {
            'lat': 48.8747265,
            'lng': 2.3505517
        })

    def test_get_address(self):
        """
        Test the get address method it should return a string with the address.
        """
        patched_address_result = {
            'candidates': [{
                'formatted_address': '7 Cité Paradis, 75010 Paris, France'
            }],
            'status': 'OK'
        }
        pi = PlaceInformations('openclassrooms ?')
        pi.call = mock.MagicMock(return_value=patched_address_result)
        self.assertEqual(pi.get_address(), '7 Cité Paradis, 75010 Paris, France')

    ################
    #   Endpoints
    ################
    def test_index(self):
        """
        Ensure that the index set up correctly.
        """
        response = self.tester.get('/', content_type='html/txt')
        self.assertEqual(response.status_code, 200)

    def test_get_google_key(self):
        """
        Ensure that the key api is set.
        """
        response = self.tester.get('/get_google_key', content_type='html/txt')
        response = json.loads(response.data.decode('utf-8'))
        self.assertIsInstance(response['key'], str)

    def test_askbot(self):
        """
        Ensure that the key api is set.
        """
        response = self.tester.get('/get_google_key', content_type='html/txt')
        response = json.loads(response.data.decode('utf-8'))
        self.assertIsInstance(response['key'], str)

if __name__ == "__main__":
    unittest.main()
