from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r"events", views.EventViewSet)
router.register(r"events/locations", views.EventLocationViewSet)
router.register(r"events/images", views.EventImageViewSet)
