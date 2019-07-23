from django.db import models, transaction
from django.conf import settings
from django.core.mail import send_mail

import requests


class ArtistSignup(models.Model):
    submitted = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    artist_statement = models.TextField()
    website = models.URLField(max_length=255, blank=True, null=True)
    instagram = models.URLField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ["-submitted"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        send_mail(
            f"ART/RE/ART | New Artist Signup | {self.name}",
            f"{self.name} has signed up for the next ART/RE/ART event.",
            f"noreply@{settings.MAILGUN_DOMAIN}",
            ["isaac@bythewood.me"],
        )
        return super().save(*args, **kwargs)


class ArtistSignupWork(models.Model):
    artist_signup = models.ForeignKey(
        to="forms.ArtistSignup", on_delete=models.CASCADE, related_name="works"
    )
    image = models.ManyToManyField(
        to="forms.ArtistSignupWorkImage", related_name="work", blank=True
    )
    title = models.CharField(max_length=255, blank=True, null=True)
    medium = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    special_installation_needs = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title or ""  # NOTE: Return '' due to bug on admin iterator M2M


class ArtistSignupWorkImage(models.Model):
    image = models.ImageField(upload_to="artist_uploads/")

    def __str__(self):
        return str(self.image)


class MailchimpSignup(models.Model):
    submitted = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255)

    class Meta:
        ordering = ["-submitted"]

    def __str__(self):
        return self.email

    @transaction.atomic
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not settings.DEBUG:
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
