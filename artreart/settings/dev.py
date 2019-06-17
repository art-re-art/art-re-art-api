from .base import *


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "TEST_SECRET_KEY"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default": {"ENGINE": "django.db.backends.postgresql", "NAME": "art-re-art"}
}


# STD
# https://docs.djangoproject.com/en/2.2/ref/settings/

PREPEND_WWW = False

SECURE_SSL_REDIRECT = False

MEDIA_URL = "https://static.artreart.com/"


# Custom

BASE_URL = "https://localhost:8000"


# Mailchimp

MAILCHIMP_KEY = None


# sorl-thumbnail
# https://sorl-thumbnail.readthedocs.io/en/latest/reference/settings.html

THUMBNAIL_DUMMY = True
