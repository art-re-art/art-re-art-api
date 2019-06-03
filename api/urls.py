from django.urls import include, path

from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r"events", views.EventViewSet)
router.register(r"eventlocations", views.EventLocationViewSet)
router.register(r"eventimages", views.EventImageViewSet)
router.register(r"artists", views.ArtistViewSet)
router.register(r"artistmedium", views.ArtistMediumViewSet)
router.register(r"artistsignup", views.ArtistSignupViewSet)
router.register(r"artistsignupwork", views.ArtistSignupWorkViewSet)
router.register(r"artistsignupworkimage", views.ArtistSignupWorkImageViewSet)
router.register(r"mailchimp", views.MailchimpSignupViewSet)
router.register(r"about", views.AboutViewSet)
router.register(r"aboutfaq", views.AboutFAQViewSet)
router.register(r"aboutdevelopers", views.AboutDeveloperViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
]
