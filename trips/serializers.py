from rest_framework import serializers
from trips.models import Trip
from trips.models import Trip, Category, Service

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "display_name",
        )

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        category = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        trip = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = (
            "id",
            "name",
            "location",
            "cost",
            "category",
            "trip",
        )

class TripSerializer(serializers.ModelSerializer):
    # serialize the services along with the trip
    # I want to make one request for all of the data.
    services = ServiceSerializer(many=True, read_only=True)
    class Meta:
        model = Trip
        fields = (
            "id",
            "cost",
            "destination",
            "duration_days",
            "title",
            "travel_style",
            "services"
        )