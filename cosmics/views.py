from django.middleware.csrf import get_token

from rest_framework import viewsets
from rest_framework.response import Response

from artists.models import Artist
from events.models import Event


class CosmicsView(viewsets.ViewSet):
    def list(self, request):
        csrf_token = get_token(request)
        artists_count = Artist.objects.count()
        events_count = Event.objects.count()
        return Response(
            {
                "csrf_token": csrf_token,
                "artists_count": artists_count,
                "events_count": events_count,
            }
        )
