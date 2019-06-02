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
    pass


@admin.register(ArtistSignupWork)
class ArtistSignupWorkAdmin(admin.ModelAdmin):
    pass


@admin.register(ArtistSignup)
class ArtistSignupAdmin(admin.ModelAdmin):
    inlines = [ArtistSignupWorkInline]


@admin.register(MailchimpSignup)
class MailchimpSignup(admin.ModelAdmin):
    pass
