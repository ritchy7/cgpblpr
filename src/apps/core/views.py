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
    .
    """
    # Get the JSON received.
    request_data = request.get_json(force=True)
    message = request_data['message']
    place_information = PlaceInformation(message)
    place_reference = place_information.place_reference
    print(place_reference)
    # status = place_information.status
    #
    # if status == 'OK':
    #     result = 'salut'
    # else:
    #     result = 'Je n\'ai rien trouve :-/'
    result = 'test'
    # Add a timer to slow down the bot.
    time.sleep(1)
    response = jsonify({
        "response": result
    })

    return response
