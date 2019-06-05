from django.contrib import admin

from .models import (
    ArtistSignup,
    ArtistSignupWork,
    ArtistSignupWorkImage,
    MailchimpSignup,
)


class ArtistSignupWorkInline(admin.StackedInline):
    model = ArtistSignupWork
    extra = 0


@admin.register(ArtistSignupWorkImage)
class ArtistSignupWorkImageAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(ArtistSignup)
class ArtistSignupAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "phone_number", "city", "state", "submitted"]
    list_filter = ["state"]
    inlines = [ArtistSignupWorkInline]
    readonly_fields = ["submitted"]


@admin.register(MailchimpSignup)
class MailchimpSignup(admin.ModelAdmin):
    pass
