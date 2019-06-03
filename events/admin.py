from django.contrib import admin

from .models import Event, EventLocation, EventImage


class EventImageInline(admin.StackedInline):
    model = ArtistSignupWork
    extra = 0


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    inlines = [EventImageInline]


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    pass


@admin.register(EventLocation)
class EventLocationAdmin(admin.ModelAdmin):
    pass
