from django.db import models, transaction
from django.conf import settings

import requests


class ArtistSignup(models.Model):
    name = models.CharField(
        max_length=255, help_text="Or alias you would prefer to go by."
    )
    email = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    artist_statement = models.TextField(
        help_text="Tell us about yourself and why you'd like to participate in Art/Re/Art"
    )
    website = models.URLField(max_length=255, blank=True, null=True)
    instagram = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class ArtistSignupWork(models.Model):
    artist_signup = models.ForeignKey(
        to="forms.ArtistSignup", on_delete=models.CASCADE, related_name="works"
    )
    image = models.OneToOneField(
        to="forms.ArtistSignupWorkImage",
        on_delete=models.CASCADE,
        related_name="work",
        blank=True,
        null=True,
    )
    title = models.CharField(max_length=255, blank=True, null=True)
    medium = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Can have multiple, ex. Painting, Installation, Video",
    )
    description = models.TextField(blank=True, null=True)
    special_installation_needs = models.TextField(
        blank=True, null=True, help_text="ex. Needs to be hanging"
    )

    def __str__(self):
        return self.title


class ArtistSignupWorkImage(models.Model):
    image = models.ImageField()

    def __str__(self):
        return self.image.filename


class MailchimpSignup(models.Model):
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255)

    def __str__(self):
        return self.email

    @transaction.atomic
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        api_url = "https://us20.api.mailchimp.com/3.0/lists/c6c9345871/members"
        headers = {"Content-Type": "application/json"}
        auth = ("my_username", settings.MAILCHIMP_KEY)
        json = {
            "email_address": self.email,
            "status": "subscribed",
            "merge_fields": {"FNAME": self.first_name, "LNAME": self.last_name},
        }
        r = requests.post(api_url, auth=auth, headers=headers, json=json)
        if r.status_code == 401:
            raise Exception("Can't access Mailchimp to submit data!")
        if r.status_code != 200:
            data = r.json()
            raise Exception(data["detail"])
