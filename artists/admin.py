from django.contrib import admin
from django.utils.html import mark_safe

import nested_admin

from .models import Artist, ArtistMedium, ArtistWork, ArtistWorkImage


@admin.register(ArtistMedium)
class ArtistMediumAdmin(admin.ModelAdmin):
    pass


class ArtistWorkImageInline(nested_admin.NestedStackedInline):
    model = ArtistWorkImage
    extra = 1
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        if obj._image:
            return mark_safe(
                '<img src="{url}" width="{width}" height="{height}" />'.format(
                    url=obj.image["small"]["url"],
                    width=obj.image["small"]["width"],
                    height=obj.image["small"]["height"],
                )
            )
        else:
            return mark_safe('Save and continue editing object to see a preview.')


class ArtistWorkInline(nested_admin.NestedStackedInline):
    filter_horizontal = ["medium"]
    inlines = [ArtistWorkImageInline]
    model = ArtistWork
    extra = 1


@admin.register(Artist)
class ArtistAdmin(nested_admin.NestedModelAdmin):
    list_display = ["name", "instagram", "website", "medium_list", "events_list"]
    list_filter = ["medium", "events"]
    inlines = [ArtistWorkInline]
    filter_horizontal = ["medium", "events"]
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        if obj._image:
            return mark_safe(
                '<img src="{url}" width="{width}" height="{height}" />'.format(
                    url=obj.image["small"]["url"],
                    width=obj.image["small"]["width"],
                    height=obj.image["small"]["height"],
                )
            )
        else:
            return mark_safe('Save and continue editing object to see a preview.')

