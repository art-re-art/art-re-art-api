from rest_framework import serializers

from forms.models import (
    MailchimpSignup,
    ArtistSignupWorkImage,
    ArtistSignupWork,
    ArtistSignup,
)


class MailchimpSignupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MailchimpSignup
        fields = ("url", "id", "first_name", "last_name", "email")


class ArtistSignupWorkImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistSignupWorkImage
        fields = ("url", "id", "image")


class ArtistSignupWorkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistSignupWork
        fields = (
            "url",
            "id",
            "artist_signup",
            "image",
            "title",
            "medium",
            "description",
            "special_installation_needs",
        )


class ArtistSignupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistSignup
        fields = (
            "url",
            "id",
            "name",
            "email",
            "phone_number",
            "city",
            "state",
            "artist_statement",
            "website",
            "instagram",
        )
