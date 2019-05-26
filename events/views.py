from django.views.generic import TemplateView

from events.models import Event


class EventIndexView(TemplateView):
    template_name = "events/event_index_view.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["events"] = Event.objects.all()
        return context
