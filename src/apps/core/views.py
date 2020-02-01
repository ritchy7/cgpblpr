# Standard imports.
import ast
import time
import random

# Flask imports.
from flask import (
    Flask,
    jsonify,
    render_template,
    request
)

# Local imports.
from apps.grandpy.constants import DESCRIPTION_DEBUT_SENTENCE, NO_FOUND_SENTENCE
from apps.grandpy.utils import PlaceInformation

app = Flask(
    __name__,
    static_folder='../../static/dist',
    template_folder='../../static'
)
app.config.from_object('config')

# Main route.
@app.route('/')
def index():
    return render_template("index.html")


@app.route('/askbot', methods=['POST'])
def ask_bot():
    """
    Parse the user sentence to get an address, a position and some description.
    """
    # Get the JSON received.
    request_data = request.get_json(force=True)
    message = request_data['message']
    place_information = PlaceInformation(message)
    if place_information.description:
        description = random.choice(DESCRIPTION_DEBUT_SENTENCE) + place_information.description
    else:
        description = random.choice(NO_FOUND_SENTENCE)

    result = {
        "address": place_information.address,
        "position": place_information.coordinates,
        "description": description
    }
    time.sleep(1)
    response = jsonify(result)

    return response
