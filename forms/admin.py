from django.contrib import admin
from django.utils.html import mark_safe

import nested_admin

from .models import (
    ArtistSignup,
    ArtistSignupWork,
    ArtistSignupWorkImage,
    MailchimpSignup,
)


@admin.register(ArtistSignupWorkImage)
class ArtistSignupWorkImageAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


class ArtistSignupWorkInline(nested_admin.NestedStackedInline):
    model = ArtistSignupWork
    extra = 0
    readonly_fields = ["image_preview"]
    fields = (
        "title",
        "medium",
        "description",
        "special_installation_needs",
        ("image", "image_preview"),
    )

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(
                '<img src="{url}" width="{width}" height="{height}" />'.format(
                    url=obj.image.image.url, width="100", height="100"
                )
            )
        return mark_safe("Save and continue editing object to see a preview.")


@admin.register(ArtistSignup)
class ArtistSignupAdmin(nested_admin.NestedModelAdmin):
    list_display = ["name", "email", "phone_number", "city", "state", "submitted"]
    list_filter = ["state"]
    inlines = [ArtistSignupWorkInline]
    readonly_fields = ["submitted"]


@admin.register(MailchimpSignup)
class MailchimpSignup(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "email"]
