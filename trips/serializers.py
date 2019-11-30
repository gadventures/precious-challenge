from rest_framework import serializers
from trips.models import Trip
from trips.models import Trip, Category, Service

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = (
            "id",
            "cost",
            "destination",
            "duration_days",
            "title",
            "travel_style",
            "service_set"
        )

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
