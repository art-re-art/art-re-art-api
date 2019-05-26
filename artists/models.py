from django.db import models
from xml.etree import ElementTree
import qrcode
import qrcode.image.svg


class Artist(models.Model):
    name = models.CharField(max_length=255)
    instagram = models.URLField(max_length=255)
    website = models.URLField(max_length=255)
    medium = models.ManyToManyField(
        to="artists.ArtistMedium", related_name="artists", blank=True
    )
    events = models.ManyToManyField(
        to="events.Event", related_name="artists", blank=True
    )

    def __str__(self):
        return self.name

    @property
    def mobile_link(self):
        return ":".join(["artist", str(self.id)])

    @property
    def qrcode(self):
        factory = qrcode.image.svg.SvgImage
        img = qrcode.make(self.mobile_link, image_factory=factory)
        svg = ElementTree.tostring(img.get_image(), encoding="utf-8", method="xml")
        return svg.decode("utf-8")


class ArtistMedium(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
