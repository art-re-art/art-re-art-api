from rest_framework import routers

from . import views


basename = "cosmics"


router = routers.DefaultRouter()
router.register(r"cosmics", views.CosmicsView, basename=basename)
