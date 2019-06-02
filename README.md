# Art/Re/Art Web

Companion website for a series of pop up art events in downtown Morganton, NC.

## Getting started

    pipenv install --dev
    npm i
    npm run-script pgpull
    npm start

## Running django commands

Use standard pipenv run for django management commands:

    pipenv run python manage.py makemigrations

A few commands have npm scripts:

    npm run-script migrate
    npm run-script makemigrations
    npm run-script createsuperuser

## Deploying

Pushing code to the Github repo will automatically deploy that code to Heroku.

## Getting a production database to test with

  npm run-script pgpull
