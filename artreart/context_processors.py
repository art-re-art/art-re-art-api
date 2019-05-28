from events.models import Event


def latest_event(self):
    return {"latest_event": Event.objects.first()}
