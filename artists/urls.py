from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r"artists/artists", views.ArtistViewSet)
router.register(r"artists/mediums", views.ArtistMediumViewSet)
router.register(r"artists/works", views.ArtistWorkViewSet)
router.register(r"artists/images", views.ArtistWorkImageViewSet)
