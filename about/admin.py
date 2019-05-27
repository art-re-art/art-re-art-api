from django.contrib import admin

from .models import About, AboutDeveloper, AboutFAQ


class AboutDeveloperInline(admin.StackedInline):
    model = AboutDeveloper
    extra = 0


class AboutFAQInline(admin.StackedInline):
    model = AboutFAQ
    extra = 0


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    inlines = [AboutDeveloperInline, AboutFAQInline]


@admin.register(AboutDeveloper)
class AboutDeveloperAdmin(admin.ModelAdmin):
    pass


@admin.register(AboutFAQ)
class AboutFAQAdmin(admin.ModelAdmin):
    pass
