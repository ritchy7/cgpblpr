# Standard Library
import os


def get_env_variable(var_name):
    """
    Get the environment variable or return exception

    Parameters
    ----------
    var_name : str
        Environment variable name.

    Returns
    -------
    : str
        Value of the Environment variable name.ß
    """
    try:
        return os.environ[var_name]
    except KeyError as e:
        print(50 * '-')
        print(f'An error occured attempting to get variable environnement :\n{e}')
        print(50 * '-')
        raise (f'Set the {var_name} environment variable.')
