
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
    def remove_service(self, request, pk=None):
        """
        A method to remove services from trip
        """
        service_id = request.POST.get('id')
        trip = Trip.objects.get(id=pk)


        try:
            service = Service.objects.get(id=service_id)
            with transaction.atomic():
                trip.services.remove(service)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
            
        
    @action(detail=True, methods=['post'])
    def add_service(self,request, pk=None):
        """
        A method to add services to a trip. 
        If the service is new, it is created and added to the trip
        """
        # Form data
        service_name = request.POST.get('name')
        service_type = ServiceType.objects.get(id=request.POST.get('type')) # Get 
        service_location = request.POST.get('location')
        service_cost = request.POST.get('cost')

        # Current trip
        trip = Trip.objects.get(id=pk)
        try:
            # If its an existing service, add it to the trip
            service = Service.objects.get(name=service_name)

            with transaction.atomic():
                trip.services.add(service)
                
            return Response(status=status.HTTP_200_OK)
            
        except Service.DoesNotExist:
            # Otherwise create the new service and then add it to the trip
            new_service = Service(name=service_name, location=service_location, type=service_type, cost=service_cost)

            with transaction.atomic():
                new_service.save()
                trip.services.add(new_service)

            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
                
            

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
