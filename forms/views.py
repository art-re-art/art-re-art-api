from rest_framework import viewsets

from .models import (
    MailchimpSignup,
    ArtistSignup,
    ArtistSignupWork,
    ArtistSignupWorkImage,
)
from . import serializers


class MailchimpSignupViewSet(viewsets.ModelViewSet):
    queryset = MailchimpSignup.objects.none()
    serializer_class = serializers.MailchimpSignupSerializer
    http_method_names = ["post"]


class ArtistSignupWorkImageViewSet(viewsets.ModelViewSet):
    queryset = ArtistSignupWorkImage.objects.none()
    serializer_class = serializers.ArtistSignupWorkImageSerializer
    http_method_names = ["post"]


class ArtistSignupWorkViewSet(viewsets.ModelViewSet):
    queryset = ArtistSignupWork.objects.none()
    serializer_class = serializers.ArtistSignupWorkSerializer
    http_method_names = ["post"]


class ArtistSignupViewSet(viewsets.ModelViewSet):
    queryset = ArtistSignup.objects.none()
    serializer_class = serializers.ArtistSignupSerializer
    http_method_names = ["post"]
