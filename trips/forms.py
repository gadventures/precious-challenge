from django.forms import ModelForm
from trips.models import Service

class ServiceForm(ModelForm):
    class Meta:
        model = Service
        fields = ["name", "location", "type", "cost", "trip"]