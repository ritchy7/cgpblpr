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
        self.assertEqual("salut", PlaceInformations("salut").parser_killer())
        self.assertEqual("salut+salut", PlaceInformations("SALUT SALUT").parser_killer())
        self.assertEqual("salut+ca+grand+mere", PlaceInformations("salut ca grand mere").parser_killer())

    def test_should_return_the_sentence_without_au_word(self):
        """
        Remove "au" word.
        """
        self.assertEqual("salut+garcon", PlaceInformations("salut au garcon").parser_killer())

    def test_should_return_the_sentence_without_aucun_word(self):
        """
        Remove "aucun" word.
        """
        self.assertEqual("homme", PlaceInformations("aucun homme").parser_killer())

    def test_should_return_the_sentence_without_elle_etait_words(self):
        """
        Remove "elle était" word.
        """
        self.assertEqual("chiante", PlaceInformations("elle était chiante").parser_killer())

    def test_should_not_return_position(self):
        """
        Ensure that the askbot return salut.
        """
        response = self.tester.post('/askbot', data=json.dumps({'message':'.'}))
        response = json.loads(response.data.decode('utf-8'))
        self.assertEqual(None, response['position'])

    ################
    #   Endpoints
    ################
    def test_test(self):
        """
        TODO
        """
        result = {
            'results': [{
                'geometry': {
                    'location': {
                        'lat': 48.8747265,
                        'lng': 2.3505517
                    } 
                } 
            }] 
        }
        pi = PlaceInformations('openclassrooms')
        pi.call = mock.MagicMock(return_value=result)
        pi.get_address()
        self.assertEqual(pi.get_coordinates(), {
            'lng': 2.3505517,
            'lat': 48.8747265
        })

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
