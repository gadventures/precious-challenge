from django.utils import timezone
from django.db import transaction
from django.shortcuts import render, redirect, get_object_or_404

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

from trips.forms import ServiceForm
from trips.models import Trip, Service
from trips.serializers import TripSerializer, ServiceSerializer

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

@api_view(['GET', 'POST'])
def service_list(request):
    """
    List all Services, or create a new Service.
    """
    if request.method == 'GET':
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        form = ServiceForm(request.POST)
        if form.is_valid():
            try:
                # Update associated Trip's cost
                trip = get_object_or_404(Trip, id=request.POST.get('trip'))
                trip.cost = trip.cost + int(request.POST.get('cost'))
                # Create a new service
                new_service = form.save(commit=False)
                new_service.timestamp = timezone.now()
                # Use transaction for atomic operation
                with transaction.atomic():
                    trip.save()
                    new_service.save()
            except Trip.DoesNotExist:
                raise("No Trip matches the given query.")
            except IntegrityError as e:
                raise(e.message())
            return Response(status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def service_detail(request, pk):
    """
    Delete a Service.
    """
    if request.method == 'DELETE':
        try:
            # Update associated Trip's cost
            service = get_object_or_404(Service, pk=pk)
            trip = get_object_or_404(Trip, id=service.trip.id)
            trip.cost = trip.cost - service.cost
            # Use transaction for atomic operation
            with transaction.atomic():
                trip.save()
                service.delete()
        except Service.DoesNotExist:
            raise("No Service matches the given query.")
        except Trip.DoesNotExist:
            raise("No Trip matches the given query.")
        return Response(status=status.HTTP_204_NO_CONTENT)