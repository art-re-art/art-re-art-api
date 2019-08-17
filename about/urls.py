from rest_framework import routers

from . import views


basename = "about"


router = routers.DefaultRouter()
router.register(r"about", views.AboutViewSet, basename=basename)
