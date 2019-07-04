# Art/Re/Art Web

Companion website for a series of pop up art events in downtown Morganton, NC.

## Getting started

    pipenv install --dev
    npm i
    npm run pg:pull
    npm start

# NPM Start is not showing all python errors

Temp work around to see:

    pipenv run python manage.py runserver

## Running django commands

Use standard pipenv run for django management commands:

    pipenv run python manage.py makemigrations

A few commands have npm scripts:

    npm run manage:migrate
    npm run manage:makemigrations
    npm run manage:createsuperuser

## Deploying

Pushing code to the Github repo will automatically deploy that code to Heroku.

## Getting a production database to test with

    npm run pg:pull
