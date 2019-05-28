from django.urls import path

from . import views


urlpatterns = [
    path('artist-signup/', views.ArtistSignupView.as_view(), name='artist_signup')
]
