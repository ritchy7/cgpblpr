# Standard imports.
import ast

# Flask imports.
from flask import (
    Flask,
    jsonify,
    render_template,
    request
)

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
    request_data = ast.literal_eval(request.data.decode('utf-8'))
    print(request_data)
    response = jsonify({'message': 'hello world'})
    return response
