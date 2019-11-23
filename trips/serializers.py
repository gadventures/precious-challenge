from rest_framework import serializers
from trips.models import Trip, Service

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
        )

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = (
            "cost",
            "name",
            "location",
            "type",
            "trip_id",
        )