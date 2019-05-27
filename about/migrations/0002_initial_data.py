from django.db import migrations
import datetime


def initial_data(apps, schema_editor):
    About = apps.get_model("about", "About")
    AboutDeveloper = apps.get_model("about", "AboutDeveloper")
    AboutFAQ = apps.get_model("about", "AboutFAQ")

    about = About.objects.create(
        title="Art/Re/Art",
        website="https://www.artreart.com/",
        description="A series of pop up art events in downtown Morganton, NC.",
    )

    AboutDeveloper.objects.create(about=about, name="Nancy VanNoppen")
    AboutDeveloper.objects.create(about=about, name="Jean VanNoppen")
    AboutDeveloper.objects.create(about=about, name="Isaac Bythewood")

    AboutFAQ.objects.create(
        about=about,
        question="What is ART/RE/ART?",
        answer="ART/RE/ART is a series of pop-up art shows taking place in and around Morganton, NC.",
    )
    AboutFAQ.objects.create(
        about=about,
        question="Where do the shows take place?",
        answer="ART/RE/ART changes venue with each show. Check out our Events tab to learn more.",
    )
    AboutFAQ.objects.create(
        about=about,
        question="How can I participate in the show?",
        answer="Sign up on our website for email updates and follow us on Instagram to stay tuned about calls for submissions. We also can always use help from volunteers, email us at artreart.morganton@gmail.com if you're interested in volunteering.",
    )
    AboutFAQ.objects.create(
        about=about,
        question="Where can I learn more?",
        answer="Visit our website, www.artreart.com, or email us artreart.morganton@gmail.com.",
    )


class Migration(migrations.Migration):

    dependencies = [("about", "0001_initial")]

    operations = [migrations.RunPython(initial_data)]
