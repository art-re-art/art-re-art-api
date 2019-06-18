from rest_framework import viewsets

from artists.models import Artist, ArtistMedium, ArtistWork, ArtistWorkImage

from .serializers import (
    ArtistSerializer,
    ArtistMediumSerializer,
    ArtistWorkSerializer,
    ArtistWorkImageSerializer,
)


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


class ArtistWorkImageViewSet(viewsets.ModelViewSet):
    queryset = ArtistWorkImage.objects.all()
    serializer_class = ArtistWorkImageSerializer
    http_method_names = ["get"]
