from django.contrib import admin

from .models import Event, EventLocation


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass


@admin.register(EventLocation)
class EventLocationAdmin(admin.ModelAdmin):
    pass
