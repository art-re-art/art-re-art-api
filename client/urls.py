from django.urls import path, re_path
from django.views.generic import TemplateView

view = TemplateView.as_view(template_name='base.html')

urlpatterns = [
    path('events/<id>/', view, name='event'),
    path('events/', view, name='events'),
    path('artists/<id>/', view, name='artist'),
    path('artists/', view, name='artists'),
    path('signup/', view, name='about'),
    path('about/', view, name='about'),
    re_path('mobile(.*|)/', view, name='mobile'),
    path('', view, name='home'),
]
