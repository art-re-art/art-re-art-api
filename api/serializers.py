from rest_framework import serializers

from events.models import Event, EventLocation
from artists.models import Artist, ArtistMedium


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ("url", "name", "instagram", "website", "medium", "events")


class ArtistMediumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtistMedium
        fields = ("url", "title")


class EventSerializer(serializers.HyperlinkedModelSerializer):
    artists = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name="artist-detail"
    )

    class Meta:
        model = Event
        fields = ("url", "title", "datetime", "location", "artists")


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
