from django.contrib import admin

from .models import Artist, ArtistMedium, ArtistWork, ArtistWorkImage


class ArtistWorkInline(admin.StackedInline):
    filter_horizontal = ["medium"]
    model = ArtistWork
    extra = 1


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ["name", "instagram", "website", "medium_list", "events_list"]
    list_filter = ["medium", "events"]
    inlines = [ArtistWorkInline]
    filter_horizontal = ["medium", "events"]


@admin.register(ArtistMedium)
class ArtistMediumAdmin(admin.ModelAdmin):
    pass


class ArtistWorkImageInline(admin.ModelAdmin):
    model = ArtistWorkImage
    extra = 1


@admin.register(ArtistWork)
class ArtistWorkAdmin(admin.ModelAdmin):
    filter_horizontal = ["medium"]


@admin.register(ArtistWorkImage)
class ArtistWorkImageAdmin(admin.ModelAdmin):
    pass
