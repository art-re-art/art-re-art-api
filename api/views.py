from rest_framework import viewsets

from events.models import Event, EventLocation
from .serializers import EventSerializer, EventLocationSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-datetime')
    serializer_class = EventSerializer


class EventLocationViewSet(viewsets.ModelViewSet):
    queryset = EventLocation.objects.all()
    serializer_class = EventLocationSerializer
