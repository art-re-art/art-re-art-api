from django.views.generic import TemplateView

from .forms import (
    ArtistSignupForm,
    ArtistSignupWorkFormSet,
)


class ArtistSignupView(TemplateView):
    template_name = "forms/artist_signup.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.method == "POST":
            form = ArtistSignupForm(self.request.POST, self.request.FILES)
            formset = ArtistSignupWorkFormSet(self.request.POST, self.request.FILES)
            if form.is_valid() and formset.is_valid():
                artist_signup = form.save()
                formset.save(commit=False)
                for form in formset:
                    form.artist_signup = artist_signup
                formset.save()
        else:
            form = ArtistSignupForm()
            formset = ArtistSignupWorkFormSet()
        context["form"] = form
        context["formset"] = formset
        return context
