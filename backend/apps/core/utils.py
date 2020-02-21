# Standard Libraries.
import os

# Local libraries.
from config import *


def get_env_variable(var_name):
    """
    Get the environment variable or return exception.

    Parameters
    ----------
    var_name : str
        Environment variable name.

    Returns
    -------
    : str
        Value of the Environment variable name.
    """
    try:
        return os.environ[var_name]
    except KeyError:
        raise ValueError(f'Set the {var_name} environment variable.')


def check_environment(env):
    """
    Return which folder the app should focus on for the HTML render and the
    static files.
    """
    if 'prod' in env:
        return 'build'
    return 'public'
