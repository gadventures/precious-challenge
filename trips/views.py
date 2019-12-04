
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action

from trips.serializers import TripSerializer, ServiceSerializer, ServiceTypeSerializer
from trips.models import Trip, Service, ServiceType
from django.db import transaction


class TripsViewSet(viewsets.ModelViewSet):
    """
    A list of all trips
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    
    @action(detail=True, methods=['post'])
    def add_service(self,request, pk=None):
        """
        A method to add services to a trip. 
        If the service is new, it is created and added to the trip
        """
        if(request.method == 'POST'):
            service_name = request.POST.get('name')
            trip = Trip.objects.get(id=pk)
            try:
                # If its an existing service, add it to the trip
                service = Service.objects.get(name=service_name)
                with transaction.atomic():
                    trip.services.add(service)
            except Service.DoesNotExist:
                # Otherwise create the new service and then add it to the trip
                print("Service does not exist. Creating..")
                service_location = request.POST.get('location')
                service_type = ServiceType.objects.get(id=request.POST.get('type'))
                service_cost = request.POST.get('cost')

                new_service = Service(name=service_name, location=service_location, type=service_type, cost=service_cost)
                with transaction.atomic():
                    new_service.save()
                    trip.services.add(new_service)
            return Response(status=status.HTTP_201_CREATED)
    
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
