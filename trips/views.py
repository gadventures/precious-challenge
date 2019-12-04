from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip
from trips.models import Hotel
# from trips.models import Accomodation
from trips.models import Transportation

from trips.serializers import TripSerializer
from trips.serializers import HotelSerializer
# from trips.serializers import AccomodationSerializer
from trips.serializers import TransportationSerializer
from django.views.generic import DetailView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        queryset = Trip.objects.all()
        return queryset
    
# Details view (view trips detail page)
class TripDetailView(DetailView):
    model=Trip
    template_name = 'index.html'
# Create views for the Post requests
# In this way we allow post requests on the frontend
class PostHotel(generics.ListCreateAPIView):
    """
    API endpoint that allows hotels to be added to a corresponding trip on the frontend.
    """
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class PostTransportation(generics.ListCreateAPIView):
    """
    API endpoint that allows transportations to be added to a corresponding trip on the frontend.
    """
    queryset = Transportation.objects.all()
    serializer_class = TransportationSerializer


