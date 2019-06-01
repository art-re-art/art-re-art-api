from django.db import models


class ArtistSignup(models.Model):
    name = models.CharField(max_length=255, help_text="Or alias you would prefer to go by.")
    email = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    artist_statement = models.TextField(help_text="Tell us about yourself and why you'd like to participate in Art/Re/Art")
    website = models.URLField(max_length=255, blank=True, null=True)
    instagram = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class ArtistSignupWork(models.Model):
    artist_signup = models.ForeignKey(
        to="forms.ArtistSignup", on_delete=models.CASCADE, related_name="works"
    )
    image = models.ImageField()
    title = models.CharField(max_length=255)
    medium = models.CharField(max_length=255, help_text="Can have multiple, ex. Painting, Installation, Video")
    description = models.TextField(blank=True, null=True)
    special_installation_needs = models.TextField(blank=True, null=True, help_text="ex. Needs to be hanging")

    def __str__(self):
        return self.title


class MailchimpSignup(models.Model):
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255)

    def __str__(self):
        return self.email
