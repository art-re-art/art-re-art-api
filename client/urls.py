from django.urls import path
from django.views.generic import TemplateView

view = TemplateView.as_view(template_name='base.html')

urlpatterns = [
    path('', view, name='home'),
    path('about/', view, name='about'),
    path('events/', view, name='about'),
    path('artists/', view, name='about'),
]
