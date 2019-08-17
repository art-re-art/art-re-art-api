from rest_framework import viewsets
from rest_framework.response import Response

from about.models import About

from . import serializers


class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = serializers.AboutSerializer
    http_method_names = ["get"]

    def list(self, request, *args, **kwargs):
        instance = About.objects.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
