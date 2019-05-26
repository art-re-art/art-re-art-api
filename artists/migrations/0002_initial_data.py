from django.db import migrations
import datetime


def initial_data(apps, schema_editor):
    Artist = apps.get_model("artists", "Artist")
    Event = apps.get_model("events", "Event")
    ArtistMedium = apps.get_model("artists", "ArtistMedium")

    first_show = Event.objects.get(title="First Show")

    artist_medium = {
        "installation": ArtistMedium.objects.create(title="Installation"),
        "painting": ArtistMedium.objects.create(title="Painting"),
        "interactive": ArtistMedium.objects.create(title="Interactive"),
        "drawing": ArtistMedium.objects.create(title="Drawing"),
        "video": ArtistMedium.objects.create(title="Video"),
        "performance": ArtistMedium.objects.create(title="Performance"),
    }

    nancy = Artist.objects.create(
        name="Nancy VanNoppen",
        instagram="https://www.instagram.com/nancyvannoppen/",
        website="https://www.nancyvannoppen.com/",
    )
    nancy.medium.add(artist_medium["installation"])
    nancy.medium.add(artist_medium["painting"])
    nancy.medium.add(artist_medium["interactive"])
    nancy.events.add(first_show)

    maxflex = Artist.objects.create(
        name="MaxFlex",
        instagram="https://www.instagram.com/max.flex.5855/",
        website="https://www.maxflex.me/",
    )
    maxflex.medium.add(artist_medium["installation"])
    maxflex.medium.add(artist_medium["painting"])
    maxflex.medium.add(artist_medium["drawing"])
    maxflex.medium.add(artist_medium["video"])
    maxflex.events.add(first_show)

    david = Artist.objects.create(
        name="David Shurbutt", website="https://www.davidshurbuttartworker.com/"
    )
    david.medium.add(artist_medium["installation"])
    david.medium.add(artist_medium["performance"])
    david.events.add(first_show)


class Migration(migrations.Migration):

    dependencies = [("artists", "0001_initial"), ("events", "0002_initial_data")]

    operations = [migrations.RunPython(initial_data)]
