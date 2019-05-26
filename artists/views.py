from django.views.generic import TemplateView

from artists.models import Artist


class ArtistIndexView(TemplateView):
    template_name = "artists/artist_index_view.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["artists"] = Artist.objects.all()
        return context
