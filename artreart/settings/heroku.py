from .base import *


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["artreart.com", "www.artreart.com"]


# STD
# https://docs.djangoproject.com/en/2.2/ref/settings/

SECURE_SSL_REDIRECT = True

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTOCOL", "https")

USE_X_FORWARDED_HOST = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True


# Custom

BASE_URL = "https://www.artreart.com"


# Mailchimp

MAILCHIMP_KEY = os.environ.get("MAILCHIMP_KEY", None)


# django-storages
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", None)

AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY", None)

AWS_STORAGE_BUCKET_NAME = "static.artreart.com"

AWS_DEFAULT_ACL = "public-read"

AWS_BUCKET_ACL = "public-read"

AWS_AUTO_CREATE_BUCKET = False

AWS_QUERYSTRING_AUTH = False

AWS_S3_FILE_OVERWRITE = False

AWS_S3_CUSTOM_DOMAIN = "static.artreart.com"

MEDIA_URL = "https://static.artreart.com/"


# Django rest framework
# https://www.django-rest-framework.org/

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",)
}


# Heroku
# https://devcenter.heroku.com/articles/django-app-configuration

django_heroku.settings(locals())


# Mailgun

EMAIL_HOST = os.environ.get("MAILGUN_SMTP_SERVER", None)

EMAIL_PORT = os.environ.get("MAILGUN_SMTP_PORT", None)

EMAIL_HOST_USER = os.environ.get("MAILGUN_SMTP_LOGIN", None)

EMAIL_HOST_PASSWORD = os.environ.get("MAILGUN_SMTP_PASSWORD", None)

MAILGUN_DOMAIN = os.environ.get("MAILGUN_DOMAIN", None)
