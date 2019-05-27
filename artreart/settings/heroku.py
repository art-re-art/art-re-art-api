from .base import *


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    'artreart.com',
    'www.artreart.com',
]


# STD
# https://docs.djangoproject.com/en/2.2/ref/settings/

PREPEND_WWW = True

SECURE_SSL_REDIRECT = True


# Heroku
# https://devcenter.heroku.com/articles/django-app-configuration

django_heroku.settings(locals())


# Custom

BASE_URL = 'https://www.artreart.com'
