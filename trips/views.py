from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
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

@csrf_exempt
@api_view(['GET', 'POST', 'DELETE'])
def service_api(request):
    """
    Handles the CRUD operations for Services.
    """
    if request.method == 'GET':
        queryset = Service.objects.all()
        serializer = ServiceSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        form = ServiceForm(request.POST)
        if form.is_valid():
            model_instance = form.save(commit=False)
            model_instance.timestamp = timezone.now()
            model_instance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'DELETE':
        try:
            service = get_object_or_404(Service, id=request.POST.get('id'))
            service.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Service.DoesNotExist:
            raise("No Service matches the given query.")