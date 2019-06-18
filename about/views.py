from rest_framework import viewsets

from about.models import About

from . import serializers


class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = serializers.AboutSerializer
    http_method_names = ["get"]
