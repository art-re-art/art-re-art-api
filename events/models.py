from django.db import models
from django.urls import reverse
from django.conf import settings

from artreart.utils import create_thumbnails, create_qrcode, create_qrcode_thumbnails


class Event(models.Model):
    title = models.CharField(max_length=255)
    datetime = models.DateTimeField()
    location = models.ForeignKey(
        to="events.EventLocation", on_delete=models.CASCADE, related_name="events"
    )
    _featured_image = models.ImageField("Featured image", blank=True, null=True)
    _qrcode = models.ImageField("QR Code", blank=True, null=True)

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"
        ordering = ["-datetime"]

    def __str__(self):
        return self.title

    @property
    def month(self):
        return self.datetime.strftime("%b")

    @property
    def day(self):
        return self.datetime.strftime("%d")

    @property
    def time(self):
        return self.datetime.strftime("%I:%M %p")

    @property
    def api_url(self):
        return settings.BASE_URL + reverse("event-detail", kwargs={"pk": self.pk})

    @property
    def qrcode(self):
        if not self._qrcode:
            qrcode_data = (
                settings.BASE_URL
                + "/mobile"
                + reverse("event-detail", kwargs={"pk": self.pk})
            )
            file_name = "qrcode-event-%s.png" % self.pk
            file_buffer = create_qrcode(qrcode_data)
            self._qrcode.save(file_name, file_buffer)
        return create_qrcode_thumbnails(self._qrcode)

    @property
    def featured_image(self):
        return create_thumbnails(self._featured_image)


class EventImage(models.Model):
    _order = models.PositiveSmallIntegerField(blank=True, null=True)
    event = models.ForeignKey(Event, related_name="images", on_delete=models.CASCADE)
    _image = models.ImageField()
    description = models.CharField(blank=True, null=True, max_length=200)

    class Meta:
        verbose_name = "Event Image"
        verbose_name_plural = "Event Images"
        ordering = ["_order"]

    def __str__(self):
        return self.description

    @property
    def image(self):
        return create_thumbnails(self._image)


class EventLocation(models.Model):
    title = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postal = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        verbose_name = "Event Location"
        verbose_name_plural = "Event Locations"

    def __str__(self):
        return self.title
