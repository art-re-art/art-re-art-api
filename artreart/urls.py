from django.contrib import admin
from django.urls import include, path
from django.templatetags.static import static
from django.views.generic.base import RedirectView


urlpatterns = [
    path('favicon.ico', RedirectView.as_view(
        url=static('images/logo.png'),
    )),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('events/', include('events.urls')),
    path('artists/', include('artists.urls')),
    path('about/', include('about.urls')),
    path('', include('home.urls')),
]
