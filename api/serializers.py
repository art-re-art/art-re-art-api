from rest_framework import serializers

from events.models import Event, EventLocation


class EventSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Event
        fields = (
            'url',
            'title',
            'datetime',
            'location',
        )


class EventLocationSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = EventLocation
        fields = (
            'url',
            'title',
            'street',
            'city',
            'state',
            'postal',
            'latitude',
            'longitude',
        )
