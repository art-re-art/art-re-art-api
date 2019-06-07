from django.db import models
from django.urls import reverse
from django.conf import settings

from xml.etree import ElementTree
import qrcode
import qrcode.image.svg

from artreart.utils import create_thumbnails


class Artist(models.Model):
    name = models.CharField(max_length=255)
    instagram = models.URLField(max_length=255, blank=True, null=True)
    website = models.URLField(max_length=255, blank=True, null=True)
    artist_statement = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    medium = models.ManyToManyField(
        to="artists.ArtistMedium", related_name="artists", blank=True
    )
    events = models.ManyToManyField(
        to="events.Event", related_name="artists", blank=True
    )

    def __str__(self):
        return self.name

    @property
    def api_url(self):
        return settings.BASE_URL + reverse("artist-detail", kwargs={"pk": self.pk})

    @property
    def qrcode(self):
        factory = qrcode.image.svg.SvgImage
        img = qrcode.make(self.api_url, box_size=20, image_factory=factory)
        svg = ElementTree.tostring(img.get_image(), encoding="utf-8", method="xml")
        return svg.decode("utf-8")

    @property
    def medium_list(self):
        if self.medium.exists():
            return ", ".join([medium.title for medium in self.medium.all()])
        else:
            return None

    @property
    def events_list(self):
        if self.events.exists():
            return ", ".join([event.title for event in self.events.all()])
        else:
            return None


class ArtistMedium(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class ArtistWork(models.Model):
    artist = models.ForeignKey(
        to="artists.Artist", on_delete=models.CASCADE, related_name="works"
    )
    title = models.CharField(max_length=255, blank=True, null=True)
    year = models.CharField(max_length=255, blank=True, null=True)
    medium = models.ManyToManyField(
        to="artists.ArtistMedium", related_name="artist_works", blank=True
    )
    dimensions = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class ArtistWorkImage(models.Model):
    artist_work = models.ForeignKey(
        to="artists.ArtistWork", on_delete=models.CASCADE, related_name="images"
    )
    _image = models.ImageField("Image")

    def __str__(self):
        return str(self.image)

    @property
    def image(self):
        return create_thumbnails(self._image)
