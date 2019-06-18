from django.contrib import admin

from .models import About, AboutOrganizer, AboutDeveloper, AboutFAQ


class AboutOrganizerInline(admin.StackedInline):
    model = AboutOrganizer
    extra = 0


class AboutDeveloperInline(admin.StackedInline):
    model = AboutDeveloper
    extra = 0


class AboutFAQInline(admin.StackedInline):
    model = AboutFAQ
    extra = 0


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ["title", "website"]
    inlines = [AboutOrganizerInline, AboutDeveloperInline, AboutFAQInline]
