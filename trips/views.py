# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

# import Trip model and TripSerializer
from trips.models import Trip
from trips.serializers import TripSerializer

# create a list view that is read-only since the purpose is to retrieve trip data and not create new trips
class TripList(generics.ListAPIView):
    # query all trips
    queryset = Trip.objects.all()
    # set serializer_class to TripSerializer
    serializer_class = TripSerializer


