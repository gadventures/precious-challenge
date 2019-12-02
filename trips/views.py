from rest_framework import viewsets
from trips.serializers import TripSerializer, ServiceSerializer
from trips.models import Trip, Service
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import action


class TripList(viewsets.ModelViewSet):
    """
    List all trips and view or add services
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    # List services associated with trip
    @action(detail=False, methods=['get'])
    def list_services(self, request, id=None):
        trip = trip = get_object_or_404(self.queryset, id=id)
        services = trip.services.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class ServiceList(viewsets.ModelViewSet):
    """
    A list of all services, read-only
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
