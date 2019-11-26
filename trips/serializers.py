from rest_framework import serializers
from trips.models import Trip
from trips.models import Hotel
from trips.models import Accomodation
from trips.models import Transportation

# Serialize the data so it can be consumed on the frontend

# The Trip Serializer should have additional fields that contain the corresponding services. 
# For this we use depth and we get the names from related_name argument from the child model
class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        depth = 1
        fields = ('title', 'imageUrl', 'travel_style', 'destination', 'cost', 'duration_days', 'hotels', 'accomodations', 'transportations')


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class AccomodationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accomodation
        fields = '__all__'

class TransportationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transportation
        fields = '__all__'