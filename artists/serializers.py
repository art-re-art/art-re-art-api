from rest_framework import serializers

from events.models import Event
from artists.models import Artist, ArtistMedium, ArtistWork, ArtistWorkImage


class ArtistMediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistMedium
        fields = ("id", "title")


class ArtistEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "slug",
            "title",
            "datetime",
            "month",
            "day",
            "time",
            "location",
            "qrcode",
            "featured_image",
        )


class ArtistWorkImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistWorkImage
        fields = ("id", "image", "description")


class ArtistWorkSerializer(serializers.ModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)
    images = ArtistWorkImageSerializer(many=True, read_only=True)

    class Meta:
        model = ArtistWork
        fields = (
            "id",
            "artist",
            "title",
            "year",
            "medium",
            "dimensions",
            "description",
            "images",
        )


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)
    events = ArtistEventSerializer(many=True, read_only=True)
    works = ArtistWorkSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = (
            "url",
            "id",
            "slug",
            "name",
            "instagram",
            "website",
            "medium",
            "events",
            "qrcode",
            "artist_statement",
            "city",
            "state",
            "works",
            "image",
        )
