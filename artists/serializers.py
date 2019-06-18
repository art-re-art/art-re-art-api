from rest_framework import serializers

from events.models import Event
from artists.models import Artist, ArtistMedium, ArtistWork, ArtistWorkImage


class ArtistMediumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistMedium
        fields = ("url", "title")


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


class ArtistWorkImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistWorkImage
        fields = ("url", "image", "description", "is_featured")


class ArtistWorkArtistSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)
    images = ArtistWorkImageSerializer(many=True, read_only=True)

    class Meta:
        model = ArtistWork
        fields = (
            "url",
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
    works = ArtistWorkArtistSerializer(many=True, read_only=True)

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
            "works",
            "image",
        )


class ArtistWorkInlineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ("url", "id", "name")


class ArtistWorkSerializer(serializers.HyperlinkedModelSerializer):
    artist = ArtistWorkInlineSerializer(read_only=True)
    medium = ArtistMediumSerializer(many=True, read_only=True)
    images = ArtistWorkImageSerializer(many=True, read_only=True)

    class Meta:
        model = ArtistWork
        fields = (
            "artist",
            "title",
            "year",
            "medium",
            "dimensions",
            "description",
            "images",
        )
