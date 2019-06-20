from django.contrib import admin
from django.utils.html import mark_safe

from grappelli.forms import GrappelliSortableHiddenMixin
import nested_admin

from .models import Artist, ArtistMedium, ArtistWork, ArtistWorkImage


@admin.register(ArtistMedium)
class ArtistMediumAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


class ArtistWorkImageInline(
    GrappelliSortableHiddenMixin, nested_admin.NestedStackedInline
):
    model = ArtistWorkImage
    extra = 0
    readonly_fields = ["image_preview"]
    fields = (("description", "is_featured"), ("_image", "image_preview"), "_order")
    sortable_field_name = "_order"

    def image_preview(self, obj):
        if obj._image:
            return mark_safe(
                '<img src="{url}" width="{width}" height="{height}" />'.format(
                    url=obj.image["square"]["url"], width="100", height="100"
                )
            )
        return mark_safe("Save and continue editing object to see a preview.")


class ArtistWorkInline(GrappelliSortableHiddenMixin, nested_admin.NestedStackedInline):
    fields = ("title", "description", ("year", "dimensions"), "medium", "_order")
    filter_horizontal = ["medium"]
    inlines = [ArtistWorkImageInline]
    model = ArtistWork
    extra = 0
    sortable_field_name = "_order"


@admin.register(Artist)
class ArtistAdmin(nested_admin.NestedModelAdmin):
    list_display = [
        "name",
        "city",
        "state",
        "medium_list",
        "events_list",
        "_order",
    ]
    list_editable = ["_order"]
    list_filter = ["medium", "events", "city", "state"]
    inlines = [ArtistWorkInline]
    filter_horizontal = ["medium", "events"]
    fields = (
        ("name", "_order"),
        "artist_statement",
        ("instagram", "website"),
        ("city", "state"),
        ("_image", "image_preview"),
        "events",
        "medium",
    )
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        if obj._image:
            return mark_safe(
                '<img src="{url}" width="{width}" height="{height}" />'.format(
                    url=obj.image["square"]["url"], width="100", height="100"
                )
            )
        return mark_safe("Save and continue editing object to see a preview.")
