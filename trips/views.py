from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip, Hotel, Transportation
from trips.serializers import TripSerializer, HotelSerializer, TransportationSerializer

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class HotelList(generics.ListAPIView):
    """
    A list of all hotels, read-only
    """
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class TransportationList(generics.ListAPIView):
    """
    A list of all transportation, read-only
    """
    queryset = Transportation.objects.all()
    serializer_class = TransportationSerializer
