# Standard imports.
import ast
import time


# Flask imports.
from flask import (
    Flask,
    jsonify,
    render_template,
    request
)

# Local imports.
from apps.grandpy.utils import PlaceInformations

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
    request_data = request.get_json(force=True)
    message = request_data['message']
    place_information = PlaceInformations(message)
    address = place_information.get_address()
    coordinates = place_information.get_coordinates()
    description = place_information.get_description()

    result = {
        "address": address,
        "position": coordinates,
        "description": description
    }
    time.sleep(1)
    response = jsonify(result)

    return response
