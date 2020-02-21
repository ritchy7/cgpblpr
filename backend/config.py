from unipath import Path

from apps.core.utils import check_environment, get_env_variable

BASE_DIR = Path(__file__).ancestor(2)
GOOGLE_API_KEY_ID = get_env_variable('GOOGLE_API_KEY_ID')
ENVIRONMENT = get_env_variable('ENVIRONMENT')
STATIC_FOLDER = f'{BASE_DIR}/{check_environment(ENVIRONMENT)}/'
TEMPLATE_FOLDER = f'{BASE_DIR}/{check_environment(ENVIRONMENT)}'
