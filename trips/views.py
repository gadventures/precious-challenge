from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip
# from trips.models import Hotel
# from trips.models import Accomodation
# from trips.models import Transportation

from trips.serializers import TripSerializer
# from trips.serializers import HotelSerializer
# from trips.serializers import AccomodationSerializer
# from trips.serializers import TransportationSerializer

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


