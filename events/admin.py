from django.contrib import admin

from .models import Event, EventLocation, EventImage


class EventImageInline(admin.StackedInline):
    model = EventImage
    extra = 0


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "datetime", "location", "number_of_images"]
    list_filter = ["location__title"]
    inlines = [EventImageInline]


@admin.register(EventLocation)
class EventLocationAdmin(admin.ModelAdmin):
    list_display = ["title", "street", "city", "state", "latitude", "longitude"]
    list_filter = ["state"]

    def get_model_perms(self, request):
        return {}
