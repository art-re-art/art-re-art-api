from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div

from .models import ArtistSignup, ArtistSignupWork


class ArtistSignupForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Div(
                Div('name', css_class='col'),
                css_class='row',
            ),
            Div(
                Div('email', css_class='col'),
                Div('phone_number', css_class='col'),
                css_class='row',
            ),
            Div(
                Div('city', css_class='col'),
                Div('state', css_class='col'),
                css_class='row',
            ),
            Div(
                Div('website', css_class='col'),
                Div('instagram', css_class='col'),
                css_class='row',
            ),
            Div(
                Div('artist_statement', css_class='col'),
                css_class='row',
            ),
        )

    class Meta:
        model = ArtistSignup
        exclude = []


class ArtistSignupWorkForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Div(
                Div('title', css_class='col'),
                Div('medium', css_class='col'),
                css_class='row',
            ),
            Div(
                Div('description', css_class='col'),
                css_class='row',
            ),
            Div(
                Div('special_installation_needs', css_class='col'),
                css_class='row',
            ),
        )

    class Meta:
        model = ArtistSignupWork
        exclude = ["artist_signup"]


ArtistSignupWorkFormSet = forms.inlineformset_factory(
    ArtistSignup, ArtistSignupWork, form=ArtistSignupWorkForm, extra=3, can_delete=False
)
