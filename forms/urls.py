from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r"forms/mailchimp", views.MailchimpSignupViewSet)
router.register(r"forms/artistsignups/artists", views.ArtistSignupViewSet)
router.register(r"forms/artistsignups/works", views.ArtistSignupWorkViewSet)
router.register(r"forms/artistsignups/images", views.ArtistSignupWorkImageViewSet)
