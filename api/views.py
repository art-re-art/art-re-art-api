from rest_framework import viewsets

from events.models import Event, EventLocation, EventImage
from artists.models import (
    Artist,
    ArtistMedium,
    ArtistWork,
)
from forms.models import (
    ArtistSignup,
    ArtistSignupWork,
    ArtistSignupWorkImage,
    MailchimpSignup,
)
from about.models import About, AboutFAQ, AboutDeveloper

from .serializers import (
    EventSerializer,
    EventImageSerializer,
    EventLocationSerializer,
    ArtistSerializer,
    ArtistMediumSerializer,
    ArtistWorkSerializer,
    ArtistSignupSerializer,
    ArtistSignupWorkSerializer,
    ArtistSignupWorkImageSerializer,
    MailchimpSignupSerializer,
    AboutSerializer,
    AboutFAQSerializer,
    AboutDeveloperSerializer,
)


class MailchimpSignupViewSet(viewsets.ModelViewSet):
    queryset = MailchimpSignup.objects.none()
    serializer_class = MailchimpSignupSerializer
    http_method_names = ["post"]


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    http_method_names = ["get"]


class ArtistMediumViewSet(viewsets.ModelViewSet):
    queryset = ArtistMedium.objects.all()
    serializer_class = ArtistMediumSerializer
    http_method_names = ["get"]


class ArtistWorkViewSet(viewsets.ModelViewSet):
    queryset = ArtistWork.objects.all()
    serializer_class = ArtistWorkSerializer
    http_method_names = ["get"]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    http_method_names = ["get"]


class EventImageViewSet(viewsets.ModelViewSet):
    queryset = EventImage.objects.all()
    serializer_class = EventImageSerializer
    http_method_names = ["get"]


class EventLocationViewSet(viewsets.ModelViewSet):
    queryset = EventLocation.objects.all()
    serializer_class = EventLocationSerializer
    http_method_names = ["get"]


class ArtistSignupWorkImageViewSet(viewsets.ModelViewSet):
    queryset = ArtistSignupWorkImage.objects.none()
    serializer_class = ArtistSignupWorkImageSerializer
    http_method_names = ["post"]


class ArtistSignupWorkViewSet(viewsets.ModelViewSet):
    queryset = ArtistSignupWork.objects.none()
    serializer_class = ArtistSignupWorkSerializer
    http_method_names = ["post"]


class ArtistSignupViewSet(viewsets.ModelViewSet):
    queryset = ArtistSignup.objects.none()
    serializer_class = ArtistSignupSerializer
    http_method_names = ["post"]


class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    http_method_names = ["get"]


class AboutFAQViewSet(viewsets.ModelViewSet):
    queryset = AboutFAQ.objects.all()
    serializer_class = AboutFAQSerializer
    http_method_names = ["get"]


class AboutDeveloperViewSet(viewsets.ModelViewSet):
    queryset = AboutDeveloper.objects.all()
    serializer_class = AboutDeveloperSerializer
    http_method_names = ["get"]
