import json
from unittest import TestCase

from apps.core.views import app
from apps.core.utils import PlaceInformations



class BotResponseTests(TestCase):
    """
    Test all bot response.
    """
    def __init__(self, *args, **kwargs):
        super(BotResponseTests, self).__init__(*args, **kwargs)
        self.tester = app.test_client(self)

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
        Remove "etait" word.
        """
        self.assertEqual("chiante", PlaceInformations("elle était chiante").parser_killer())

    def test_should_return_status_ok(self):
        self.assertEqual("OK", PlaceInformations("salut").status)
        self.assertEqual("OK", PlaceInformations("allee des roses").status)

    def test_should_retorn_zero_results_status(self):
        self.assertEqual("ZERO_RESULTS", PlaceInformations("je m'appel ritchy").status)
        self.assertEqual("ZERO_RESULTS", PlaceInformations("salut j'aime bien discuter avec les robots").status)

    def test_should_return_zero_results(self):
        self.assertEqual("ZERO_RESULTS", PlaceInformations("je m'appel ritchy").status)
        self.assertEqual("ZERO_RESULTS", PlaceInformations("salut j'aime bien discuter avec les robots").status)

    def test_index(self):
        """
        Ensure that the index set up correctly.
        """
        response = self.tester.get('/', content_type='html/txt')
        self.assertEqual(response.status_code, 200)

    def test_should_return_salut(self):
        """
        Ensure that the askbot return salut.
        """
        response = self.tester.post(
            '/askbot',
            data=json.dumps({'message':'.'})
        )
        self.assertIn(b"Je n'ai rien trouve :-/", response.data)

if __name__ == "__main__":
    unittest.main()
