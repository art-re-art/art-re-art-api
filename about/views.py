from rest_framework import viewsets

from about.models import About, AboutFAQ, AboutDeveloper

from . import serializers


class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = serializers.AboutSerializer
    http_method_names = ["get"]


class AboutFAQViewSet(viewsets.ModelViewSet):
    queryset = AboutFAQ.objects.all()
    serializer_class = serializers.AboutFAQSerializer
    http_method_names = ["get"]


class AboutDeveloperViewSet(viewsets.ModelViewSet):
    queryset = AboutDeveloper.objects.all()
    serializer_class = serializers.AboutDeveloperSerializer
    http_method_names = ["get"]
