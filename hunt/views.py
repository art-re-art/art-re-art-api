from rest_framework import viewsets

from hunt.models import HuntItem

from .serializers import (
    HuntItemSerializer,
)


class HuntViewSet(viewsets.ModelViewSet):
    queryset = HuntItem.objects.all()
    serializer_class = HuntItemSerializer
    http_method_names = ["get"]
