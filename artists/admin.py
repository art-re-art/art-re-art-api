from django.contrib import admin

from .models import Artist, ArtistMedium


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    pass


@admin.register(ArtistMedium)
class ArtistMediumAdmin(admin.ModelAdmin):
    pass
