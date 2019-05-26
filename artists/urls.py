from django.urls import path

from . import views


urlpatterns = [
    path('', views.ArtistIndexView.as_view(), name='artist_index')
]
