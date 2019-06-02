from django.contrib import admin
from django.urls import include, path
from django.templatetags.static import static
from django.views.generic.base import RedirectView
from django.conf import settings


urlpatterns = [
    path("favicon.ico", RedirectView.as_view(url=static("images/favicon.png"))),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("", include("client.urls")),
]


if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
