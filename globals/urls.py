from rest_framework import routers

from . import views


basename = "globals"


router = routers.DefaultRouter()
router.register(r"globals", views.GlobalsView, basename=basename)
