from rest_framework import viewsets

from events.models import Event, EventLocation, EventImage

from . import serializers


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = serializers.EventSerializer
    http_method_names = ["get"]


class EventImageViewSet(viewsets.ModelViewSet):
    queryset = EventImage.objects.all()
    serializer_class = serializers.EventImageSerializer
    http_method_names = ["get"]


class EventLocationViewSet(viewsets.ModelViewSet):
    queryset = EventLocation.objects.all()
    serializer_class = serializers.EventLocationSerializer
    http_method_names = ["get"]
