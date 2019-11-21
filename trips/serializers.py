from rest_framework import serializers
from trips.models import Trip
# from trips.models import Hotel
# from trips.models import Accomodation
# from trips.models import Transportation

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
            "hotel",
            "accomodation",
            "transportation",
            "imageUrl"
        )

# class HotelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Hotel
#         fields = (
#             "trip",
#             "name",
#             "typeOfService",
#             "location",
#             "cost"
#         )

# class AccomodationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Accomodation
#         fields = (
#             "trip",
#             "name",
#             "typeOfService",
#             "location",
#             "cost"
#         )

# class TransportationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Transportation
#         fields = (
#             "trip",
#             "name",
#             "typeOfService",
#             "location",
#             "cost"
#         )