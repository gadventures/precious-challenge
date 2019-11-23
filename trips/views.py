from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip, Service
from trips.serializers import TripSerializer, ServiceSerializer

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class ServiceList(generics.ListAPIView):
    """
    A list of all services, read-only
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer