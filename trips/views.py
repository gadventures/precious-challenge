from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip
from trips.serializers import TripSerializer

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


