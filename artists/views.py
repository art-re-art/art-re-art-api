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
