from .constants import STOP_WORDS


def parser_killer(sentence):
    """
    Parse the sentence given in parameter to get only the important words

    Arguments:
        sentence - str
            Sentence.
    """
    sentence = ' '.join([
        word
        for word in sentence.split()
        if word not in STOP_WORDS
    ])
    return sentence
