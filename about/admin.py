from django.contrib import admin

from grappelli.forms import GrappelliSortableHiddenMixin
import nested_admin

from .models import About, AboutOrganizer, AboutDeveloper, AboutFAQ


class AboutOrganizerInline(GrappelliSortableHiddenMixin, nested_admin.NestedStackedInline):
    model = AboutOrganizer
    extra = 0
    sortable_field_name = "_order"


class AboutDeveloperInline(GrappelliSortableHiddenMixin, nested_admin.NestedStackedInline):
    model = AboutDeveloper
    extra = 0
    sortable_field_name = "_order"


class AboutFAQInline(GrappelliSortableHiddenMixin, nested_admin.NestedStackedInline):
    model = AboutFAQ
    extra = 0
    sortable_field_name = "_order"


@admin.register(About)
class AboutAdmin(nested_admin.NestedModelAdmin):
    list_display = ["title", "website"]
    inlines = [AboutOrganizerInline, AboutDeveloperInline, AboutFAQInline]
