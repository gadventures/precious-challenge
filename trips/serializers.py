from rest_framework import serializers
from trips.models import Trip
from trips.models import Hotel
from trips.models import Accomodation
from trips.models import Transportation

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__' 

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