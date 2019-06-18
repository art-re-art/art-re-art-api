from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r"about", views.AboutViewSet)
router.register(r"about/faqs", views.AboutFAQViewSet)
router.register(r"about/developers", views.AboutDeveloperViewSet)
