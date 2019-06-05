from django.contrib import admin

from .models import Artist, ArtistMedium


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['name', 'instagram', 'website', 'medium_list', 'events_list']
    list_filter = ['medium', 'events']


@admin.register(ArtistMedium)
class ArtistMediumAdmin(admin.ModelAdmin):
    pass
