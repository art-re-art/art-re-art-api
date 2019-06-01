from rest_framework import viewsets

from events.models import Event, EventLocation
from artists.models import Artist, ArtistMedium
from forms.models import ArtistSignup, ArtistSignupWork
from .serializers import (
    EventSerializer,
    EventLocationSerializer,
    ArtistSerializer,
    ArtistMediumSerializer,
    ArtistSignupSerializer
)


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistMediumViewSet(viewsets.ModelViewSet):
    queryset = ArtistMedium.objects.all()
    serializer_class = ArtistMediumSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventLocationViewSet(viewsets.ModelViewSet):
    queryset = EventLocation.objects.all()
    serializer_class = EventLocationSerializer


class ArtistSignupViewSet(viewsets.ModelViewSet):
    queryset = ArtistSignup.objects.none()
    serializer_class = ArtistSignupSerializer
