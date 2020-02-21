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

from flask_cors import CORS

# Local imports.
from config import ENVIRONMENT, GOOGLE_API_KEY_ID, STATIC_FOLDER, TEMPLATE_FOLDER
from apps.grandpy.utils import PlaceInformations


app = Flask(
    __name__,
    static_folder=STATIC_FOLDER,
    template_folder=TEMPLATE_FOLDER
)
app.config.from_object('config')
CORS(app)
# Main route.
@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/get_google_key', methods=['GET'])
def get_google_key():
    """
    Return the Google API key.
    """
    response = {"key": GOOGLE_API_KEY_ID}
    return jsonify(response)

@app.route('/askbot', methods=['POST'])
def ask_bot():
    """
    Parse the user sentence to get an address, a position and some description.
    """
    request_data = request.get_json(force=True)
    place_information = PlaceInformations(request_data.get('message', ''))
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
