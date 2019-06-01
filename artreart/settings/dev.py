from .base import *


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'TEST_SECRET_KEY'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# STD
# https://docs.djangoproject.com/en/2.2/ref/settings/

PREPEND_WWW = False

SECURE_SSL_REDIRECT = False


# Custom

BASE_URL = 'https://localhost:8000'


# Mailchimp

MAILCHIMP_KEY = None
