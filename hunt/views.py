from rest_framework import viewsets

from hunt.models import Hunt

from .serializers import HuntSerializer


class HuntViewSet(viewsets.ModelViewSet):
    queryset = Hunt.objects.all()
    serializer_class = HuntSerializer
    http_method_names = ["get"]
