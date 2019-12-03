
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, viewsets
from rest_framework.decorators import action

from trips.serializers import TripSerializer, ServiceSerializer, ServiceTypeSerializer
from trips.models import Trip, Service, ServiceType


class TripsViewSet(viewsets.ModelViewSet):
    """
    A list of all trips
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    @action(detail=True, methods=['get'], name='Trip services', description="View services associated to trip")
    def services(self, request, pk=None):
        """
        A list of the trip's services
        """
        trip = get_object_or_404(self.queryset, id=pk)
        services = trip.services.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)


class ServicesViewSet(viewsets.ModelViewSet):
    """
    A list of all services
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceTypesViewSet(viewsets.ModelViewSet):
    """
    A list of all service types (categories)
    """
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeSerializer
