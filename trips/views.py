from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip
# from trips.models import Hotel
# from trips.models import Accomodation
# from trips.models import Transportation

from trips.serializers import TripSerializer
from trips.serializers import HotelSerializer
# from trips.serializers import AccomodationSerializer
# from trips.serializers import TransportationSerializer
from django.views.generic import DetailView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

# Details view (view trips detail page)
class TripDetailView(DetailView):
 model=Trip
template_name = 'index.html'

class TripDetailPostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        posts_serializer = HotelSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
