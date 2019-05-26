from rest_framework import serializers

from events.models import Event, EventLocation
from artists.models import Artist, ArtistMedium


class ArtistMediumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistMedium
        fields = ("url", "title")


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = ("url", "name", "instagram", "website", "medium", "events")


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


class EventArtistSerializer(serializers.HyperlinkedModelSerializer):
    medium = ArtistMediumSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = ("url", "name", "instagram", "website", "medium")


class EventSerializer(serializers.HyperlinkedModelSerializer):
    artists = EventArtistSerializer(many=True, read_only=True)
    location = EventLocationSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ("url", "title", "datetime", "month", "day", "time", "location", "artists")
