from django.db import migrations
import datetime


def initial_data(apps, schema_editor):
    Event = apps.get_model("events", "Event")
    EventLocation = apps.get_model("events", "EventLocation")
    event_location = EventLocation.objects.create(
        title="Giles Motors",
        street="202 S. Sterling St.",
        city="Morganton",
        state="NC",
        postal="28655",
        latitude="35.7442",
        longitude="-81.68685",
    )
    Event.objects.create(
        title="First Show",
        datetime=datetime.datetime(2019, 4, 13, 18, 30),
        location=event_location,
    )
    Event.objects.create(
        title="Second Show",
        datetime=datetime.datetime(2019, 10, 13, 18, 30),
        location=event_location,
    )
    Event.objects.create(
        title="Third Show",
        datetime=datetime.datetime(2020, 4, 13, 18, 30),
        location=event_location,
    )


class Migration(migrations.Migration):

    dependencies = [("events", "0001_initial")]

    operations = [migrations.RunPython(initial_data)]
