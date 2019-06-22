from django.contrib import admin
from django.utils.html import mark_safe

from grappelli.forms import GrappelliSortableHiddenMixin
import nested_admin

from .models import Event, EventLocation, EventImage


@admin.register(EventLocation)
class EventLocationAdmin(admin.ModelAdmin):
    list_display = ["title", "street", "city", "state", "latitude", "longitude"]
    list_filter = ["state"]

    def get_model_perms(self, request):
        return {}


class EventImageInline(GrappelliSortableHiddenMixin, nested_admin.NestedStackedInline):
    model = EventImage
    extra = 0
    readonly_fields = ["image_preview"]
    sortable_field_name = "_order"
    fields = ("description", ("_image", "image_preview"), "_order")

    def image_preview(self, obj):
        if obj._image:
            return mark_safe(
                '<img src="{url}" width="{width}" height="{height}" />'.format(
                    url=obj.image["square"]["url"], width="100", height="100"
                )
            )
        return mark_safe("Save and continue editing object to see a preview.")


@admin.register(Event)
class EventAdmin(nested_admin.NestedModelAdmin):
    list_display = ["title", "datetime", "location", "number_of_images"]
    list_filter = ["location__title"]
    inlines = [EventImageInline]
    readonly_fields = ["featured_image_preview"]
    fields = (
        "title",
        ("datetime", "location"),
        ("_featured_image", "featured_image_preview"),
    )

    def number_of_images(self, obj):
        return str(obj.images.count())

    def featured_image_preview(self, obj):
        if obj._featured_image:
            return mark_safe(
                '<img src="{url}" width="{width}" height="{height}" />'.format(
                    url=obj.featured_image["square"]["url"], width="100", height="100"
                )
            )
        return mark_safe("Save and continue editing object to see a preview.")
