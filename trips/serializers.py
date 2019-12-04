from rest_framework import serializers

from trips.models import Trip, Service, ServiceType
from django.db.models import Sum


class ServiceTypeSerializer(serializers.ModelSerializer):
    """
    Serialize different service types (categories)
    """

    class Meta:
        model = ServiceType
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    """
    A service model serializer
    """

    type = ServiceTypeSerializer()

    class Meta:
        model = Service
        fields = (
            "id",
            "name",
            "location",
            "type",
            "cost"
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

    services = ServiceSerializer(many=True)

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
            "services",
        )

