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
from apps.grandpy.utils import parser_killer

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
    # Get the JSON received.
    request_data = ast.literal_eval(request.data.decode('utf-8'))
    # Add a timer to slow down the bot.
    time.sleep(2)
    response = jsonify({"response": parser_killer(request_data['message'])})
    return response
