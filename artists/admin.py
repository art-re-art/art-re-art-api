from django.contrib import admin

from .models import Artist, ArtistMedium, ArtistWork, ArtistWorkImage


class ArtistWorkInline(admin.StackedInline):
    filter_horizontal = ['medium',]
    model = ArtistWork
    extra = 0


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['name', 'instagram', 'website', 'medium_list', 'events_list']
    list_filter = ['medium', 'events']
    inlines = [ArtistWorkInline,]


@admin.register(ArtistMedium)
class ArtistMediumAdmin(admin.ModelAdmin):
    pass


@admin.register(ArtistWorkImage)
class ArtistWorkImageAdmin(admin.ModelAdmin):
    pass
