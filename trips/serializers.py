from rest_framework import serializers

from trips.models import Trip, Service
from django.db.models import Sum
       


class ServiceSerializer(serializers.ModelSerializer):
    """
    A service model serializer
    """
    class Meta:
        model = Service
        fields = (
            '__all__'
        )

class TripSerializer(serializers.ModelSerializer):
    """
    A trip model serializer
    """

    @staticmethod
    def calc_total(instance):
        """
        Calculate total cost of the trip including services
        """
        return instance.calc_total()

    total_cost = serializers.SerializerMethodField(method_name="calc_total")

    class Meta:
        model = Trip
        fields = (
            "total_cost",
            "cost",
            "destination",
            "duration_days",
            "id",
            "title",
            "travel_style",
            "services"
        )
 