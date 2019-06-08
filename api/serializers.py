from rest_framework import serializers

from events.models import Event, EventLocation, EventImage
from artists.models import (
    Artist,
    ArtistMedium,
    ArtistWork,
    ArtistWorkImage
)
from about.models import About, AboutDeveloper, AboutFAQ
from forms.models import (
    ArtistSignup,
    ArtistSignupWork,
    ArtistSignupWorkImage,
    MailchimpSignup,
)


class MailchimpSignupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MailchimpSignup
        fields = ("url", "first_name", "last_name", "email")


class EventImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventImage
        fields = ("url", "image", "description")


class EventLocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventLocation
        fields = (
            "url",
            "title",
            "street",
            "city",
            "state",
            "postal",
            "latitude",
            "longitude",
        )


class ArtistMediumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistMedium
        fields = ("url", "title")


class EventArtistSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = ("url", "id", "name", "instagram", "website", "medium", "qrcode")


class EventSerializer(serializers.HyperlinkedModelSerializer):
    artists = EventArtistSerializer(many=True, read_only=True)
    location = EventLocationSerializer(read_only=True)
    images = EventImageSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = (
            "url",
            "id",
            "title",
            "datetime",
            "month",
            "day",
            "time",
            "location",
            "artists",
            "images",
            "qrcode",
            "featured_image",
        )


class ArtistEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = (
            "url",
            "id",
            "title",
            "datetime",
            "month",
            "day",
            "time",
            "location",
            "qrcode",
            "featured_image",
        )


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)
    events = ArtistEventSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = (
            "url",
            "id",
            "name",
            "instagram",
            "website",
            "medium",
            "events",
            "qrcode",
            "artist_statement",
            "city",
            "state",
        )


class ArtistSignupWorkImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistSignupWorkImage
        fields = ("url", "image",)


class ArtistSignupWorkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistSignupWork
        fields = (
            "url",
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
            "name",
            "email",
            "phone_number",
            "city",
            "state",
            "artist_statement",
            "website",
            "instagram",
        )


class AboutFAQSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AboutFAQ
        fields = ("is_mobile", "question", "answer",)


class AboutDeveloperSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AboutDeveloper
        fields = ("name", "website",)


class AboutSerializer(serializers.HyperlinkedModelSerializer):
    faqs = AboutFAQSerializer(many=True, read_only=True)
    developers = AboutDeveloperSerializer(many=True, read_only=True)

    class Meta:
        model = About
        fields = ("url", "id", "title", "website", "description", "faqs", "developers",)


class ArtistWorkImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistWorkImage
        fields = ("url", "image", "description", "is_featured",)


class ArtistWorkSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)
    images = ArtistWorkImageSerializer(many=True, read_only=True)

    class Meta:
        model = ArtistWork
        fields = ("artist", "title", "year", "medium","dimensions", "description", "images",)
