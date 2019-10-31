from rest_framework import serializers
from trips.models import Trip, Hotel, Transportation

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = (
            "cost",
            "destination",
            "duration_days",
            "id",
            "title",
            "travel_style",
            "hotels",
            "transportation"
        )
        depth = 1

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = (
            "name",
            "type",
            "id",
            "location",
            "cost",
        )

class TransportationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transportation
        fields = (
            "name",
            "type",
            "id",
            "location",
            "cost",
        )
