from django.db import models
from django.urls import reverse
from django.conf import settings
from django.utils.text import slugify

from artreart.utils import create_thumbnails, create_qrcode, create_qrcode_thumbnails


class Artist(models.Model):
    _order = models.PositiveSmallIntegerField(default=100, blank=True, null=True)
    slug = models.SlugField(max_length=255, blank=True, null=True)
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
    _image = models.ImageField("Image", blank=True, null=True)
    _qrcode = models.ImageField("Image", blank=True, null=True)

    class Meta:
        verbose_name = "Artist"
        verbose_name_plural = "Aritsts"
        ordering = ["_order"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    @property
    def qrcode(self):
        if not self._qrcode:
            qrcode_data = (
                settings.BASE_URL
                + "/mobile"
                + reverse("artist-detail", kwargs={"pk": self.pk})
            )
            file_name = "qrcode-artist-%s.png" % self.pk
            file_buffer = create_qrcode(qrcode_data)
            self._qrcode.save(file_name, file_buffer)
        return create_qrcode_thumbnails(self._qrcode)

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

    @property
    def image(self):
        if self._image:
            return create_thumbnails(self._image)


class ArtistMedium(models.Model):
    title = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Artist Medium"
        verbose_name_plural = "Aritst Mediums"

    def __str__(self):
        return self.title


class ArtistWork(models.Model):
    _order = models.PositiveSmallIntegerField(blank=True, null=True)
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

    class Meta:
        verbose_name = "Artist Work"
        verbose_name_plural = "Aritst Works"
        ordering = ["_order"]

    def __str__(self):
        return self.title


class ArtistWorkImage(models.Model):
    _order = models.PositiveSmallIntegerField(blank=True, null=True)
    artist_work = models.ForeignKey(
        to="artists.ArtistWork", on_delete=models.CASCADE, related_name="images"
    )
    _image = models.ImageField("Image")
    description = models.CharField(max_length=255, null=True)

    class Meta:
        verbose_name = "Artist Work Image"
        verbose_name_plural = "Aritst Work Images"
        ordering = ["_order"]

    def __str__(self):
        return self.artist_work.title

    @property
    def image(self):
        return create_thumbnails(self._image)
