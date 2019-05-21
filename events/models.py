from django.db import models


class Event(models.Model):
    title = models.CharField(
        max_length=255,
    )
    datetime = models.DateTimeField()
    location = models.ForeignKey(
        to='events.EventLocation',
        on_delete=models.CASCADE,
        related_name='events',
    )


class EventLocation(models.Model):
    title = models.CharField(
        max_length=255,
    )
    street = models.CharField(
        max_length=255,
    )
    city = models.CharField(
        max_length=255,
    )
    state = models.CharField(
        max_length=255,
    )
    postal = models.CharField(
        max_length=255,
    )
    latitude = models.FloatField()
    longitude = models.FloatField()
