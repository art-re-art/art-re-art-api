from django import forms

from crispy_forms.helper import FormHelper

from .models import ArtistSignup, ArtistSignupWork


class ArtistSignupForm(forms.ModelForm):
    class Meta:
        model = ArtistSignup
        exclude = []


class ArtistSignupWorkForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.template = "bootstrap4/table_inline_formset.html"

    class Meta:
        model = ArtistSignupWork
        exclude = ["artist_signup"]


ArtistSignupWorkFormSet = forms.inlineformset_factory(
    ArtistSignup, ArtistSignupWork, form=ArtistSignupWorkForm, extra=1, can_delete=False
)
