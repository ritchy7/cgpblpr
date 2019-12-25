from flask import Flask

app = Flask(__name__)
app.config.from_object('apps.grandpy.settings')


@app.route('/')
def index():
    return "Hello world !"
