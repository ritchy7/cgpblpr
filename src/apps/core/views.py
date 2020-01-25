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
from apps.grandpy.constants import DESCRIPTION_DEBUT_SENTENCE
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
    description = random.choice(DESCRIPTION_DEBUT_SENTENCE) + "" if place_information.address else None
    result = {
        "address": place_information.address,
        "position": {'lng': 0, 'lat': 0},
        "description": description
    }
    time.sleep(1)
    response = jsonify(result)

    return response
