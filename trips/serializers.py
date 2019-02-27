from rest_framework import serializers
# import the Trip model
from trips.models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        # all of these fields will be returned 
        fields = ("id","title","travel_style","destination","duration_days","cost")
