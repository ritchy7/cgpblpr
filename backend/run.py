from apps.core.views import app
from config import ENVIRONMENT

if __name__ == "__main__":
    kwargs = {}
    if 'prod' not in ENVIRONMENT:
        kwargs = {
            "port": 8000,
            "debug": True,
            "host": '0'
        }
    app.run(**kwargs)
