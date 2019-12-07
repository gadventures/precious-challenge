from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip, Hotel, Transportation, SelectedTrip
from trips.serializers import TripSerializer, HotelSerializer, TransportationSerializer, SelectedTripSerializer

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

class PostSelectedTrips(generics.CreateAPIView):
    """
    A list of all trips, read-only
    """
    queryset = SelectedTrip.objects.all()
    serializer_class = SelectedTripSerializer

class GetListSelectedTrips(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = SelectedTrip.objects.all()
    serializer_class = SelectedTripSerializer

class DeleteListSelectedTrips(generics.DestroyAPIView):
    """
    A list of all trips, read-only
    """
    queryset = SelectedTrip.objects.all()
    serializer_class = SelectedTripSerializer

    def destroy(self, request, pk=None):
        SelectedTrip.objects.all().delete()
        return Response('deleted', status=200)