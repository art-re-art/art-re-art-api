from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.templatetags.static import static
from django.views.generic.base import RedirectView

from rest_framework import routers

from forms.urls import router as forms_router
from about.urls import router as about_router
from events.urls import router as events_router
from artists.urls import router as artists_router


# API router setup from all our apps
router = routers.DefaultRouter()
router.registry.extend(about_router.registry)
router.registry.extend(events_router.registry)
router.registry.extend(artists_router.registry)
router.registry.extend(forms_router.registry)


# Standard Django URL patterns
urlpatterns = [
    # API
    path("api/auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/", include(router.urls)),
    # Static
    path("favicon.ico", RedirectView.as_view(url=static("images/favicon.png"))),
    # Admin
    path("_nested_admin/", include("nested_admin.urls")),
    path("admin/", admin.site.urls),
    # Client
    path("", include("client.urls")),
]


# Serve static files locally when DEBUG is turned on
if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
