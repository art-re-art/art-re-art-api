from rest_framework import serializers

from events.models import Event, EventLocation, EventImage
from artists.models import Artist, ArtistMedium, ArtistWorkImage


class ArtistMediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistMedium
        fields = ("id", "title")


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = (
            "url",
            "id",
            "name",
            "instagram",
            "website",
            "medium",
            "qrcode",
            "image",
        )


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ("id", "image", "description")


class EventLocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventLocation
        fields = (
            "url",
            "id",
            "title",
            "street",
            "city",
            "state",
            "postal",
            "latitude",
            "longitude",
        )


class EventSerializer(serializers.HyperlinkedModelSerializer):
    artists = ArtistSerializer(many=True, read_only=True)
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
            "qrcode",
            "featured_image",
            "artists",
            "images",
        )
