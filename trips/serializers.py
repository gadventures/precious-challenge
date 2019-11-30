from rest_framework import serializers
from trips.models import Trip
from trips.models import Trip, Category, Service

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
            "service_set"
        )

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "display_name",
        )

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        category = CategorySerializer(many=False, required=True)
        trip = TripSerializer(many=False, required=True)
        fields = (
            "name",
            "location",
            "cost",
            "category",
            "trip",
        )
