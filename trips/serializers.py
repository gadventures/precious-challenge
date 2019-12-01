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
    @staticmethod
    def calculate_sale_price(instance):
        """
        Calculate the sale price of the trip from its base cost and services
        """
        # call the class method on the instance of trip given
        return instance.calculate_sale_price()

    # serialize the services along with the trip
    # I want to make one request for all of the data.
    services = ServiceSerializer(many=True, read_only=True)
    # generate the total sale price before going to the ui
    sale_price = serializers.SerializerMethodField(method_name='calculate_sale_price')
    class Meta:
        model = Trip
        fields = (
            "id",
            "cost",
            "sale_price",
            "destination",
            "duration_days",
            "title",
            "travel_style",
            "image_url",
            "services"
        )