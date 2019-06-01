from django.urls import include, path

from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r"events", views.EventViewSet)
router.register(r"eventlocations", views.EventLocationViewSet)
router.register(r"artists", views.ArtistViewSet)
router.register(r"artistmedium", views.ArtistMediumViewSet)
router.register(r"artistsignup", views.ArtistSignupViewSet)
router.register(r"mailchimp", views.MailchimpSignupViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
]
