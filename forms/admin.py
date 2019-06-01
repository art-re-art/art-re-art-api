from django.contrib import admin

from .models import ArtistSignup, ArtistSignupWork


class ArtistSignupWorkInline(admin.StackedInline):
    model = ArtistSignupWork
    extra = 0


@admin.register(ArtistSignup)
class ArtistSignupAdmin(admin.ModelAdmin):
    inlines = [ArtistSignupWorkInline]
