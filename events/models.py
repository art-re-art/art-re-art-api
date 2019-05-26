from django.db import models
from xml.etree import ElementTree
import qrcode
import qrcode.image.svg


class Event(models.Model):
    title = models.CharField(max_length=255)
    datetime = models.DateTimeField()
    location = models.ForeignKey(
        to="events.EventLocation", on_delete=models.CASCADE, related_name="events"
    )

    def __str__(self):
        return self.title

    @property
    def month(self):
        return self.datetime.strftime('%b')

    @property
    def day(self):
        return self.datetime.strftime('%d')

    @property
    def time(self):
        return self.datetime.strftime('%I:%M %p')



    @property
    def mobile_link(self):
        return ":".join(["event", str(self.id)])

    @property
    def qrcode(self):
        factory = qrcode.image.svg.SvgImage
        img = qrcode.make(self.mobile_link, image_factory=factory)
        svg = ElementTree.tostring(img.get_image(), encoding="utf-8", method="xml")
        return svg.decode("utf-8")


class EventLocation(models.Model):
    title = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postal = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.title
