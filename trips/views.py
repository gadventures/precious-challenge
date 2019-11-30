from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.template import RequestContext
from django.utils.decorators import method_decorator
from trips.models import Trip, Category, Service
from trips.serializers import TripSerializer, CategorySerializer, ServiceSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
import json

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

# This decorator is here because I was testing my api with postman
@method_decorator(csrf_exempt, name='dispatch')
class GenericEndpoint(View):
    """
    A list of all categories of services
    I wanted the ability to post new records to my Category table as well as Service.
    This endpoint was made to avoid duplicating logic for 
        handling requests for services and categories
    """
    def __init__(self):
        # these will be used to share the logic for handling requests for multiple endpoints
        self.endpoint_serializer = None
        self.endpoint_model = None

    @staticmethod
    def format_response(response):
        '''
        Take some generic response and append necessary metadata to send a response to the user
        '''
        # Format the response to be sent to the client
        response.accepted_renderer = JSONRenderer()
        response.accepted_media_type = "application/json"
        response.renderer_context = {}

    def get(self, request, pk=None):
        '''
        Allow the user to query the database. 
        If given the primary key, return the target item. else return all items for that table
        '''
        # Handle get request
        if pk is not None: 
             # If there is a pk, go and get the record that matches it from the model
            try:
                queryset = self.endpoint_model.objects.get(pk=pk)
                # if a foreign pk was given, return only the record that matches that id
                serializer = self.endpoint_serializer(queryset)
                response = Response(serializer.data)
            except self.endpoint_model.DoesNotExist:
                response = Response(status=status.HTTP_404_NOT_FOUND)
        else:
            # if no foreign pk was given, return all records
            queryset = self.endpoint_model.objects.all()
            serializer = self.endpoint_serializer(queryset, many=True)
            response = Response(serializer.data)
        
        # format the response to be sent back to the client
        GenericEndpoint.format_response(response)
        # return the response
        return response

    def post(self, request):
        '''
        Allow the user to post some new record to the dataservice
        This will accept some json data, parse it, validate it and save it.
        '''
        # create a new object
        queryset = self.endpoint_model()
        # parse out the request body from the post request
        requestBody = json.loads(request.body)
        serializer = self.endpoint_serializer(queryset, data=requestBody)
    
        # verify the record and if valid, save it
        if serializer.is_valid():
            serializer.save()
            response = Response(serializer.data)
        else:
            response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # format the response to be sent back to the client
        GenericEndpoint.format_response(response)
        # return the response
        return response

    def delete(self, request, pk=None):
        '''
        Going to include delete in this project as well
        Including this because the user may make an error creating their service
        They will need some way to remove a service if it is entered incorrectly
        
        Note: As a future enhancement, this project should allow a user to
            edit an existing service.
        '''
        # If there is a pk, go and get the record that matches it from the model
        try:
            queryset = self.endpoint_model.objects.get(pk=pk)
            # delete the record
            queryset.delete()
            # prepare response for the successful delete
            response = Response(status=status.HTTP_204_NO_CONTENT)
        except self.endpoint_model.DoesNotExist:
            response = Response(status=status.HTTP_404_NOT_FOUND)

        # format the response to be sent back to the client
        GenericEndpoint.format_response(response)
        # return the response
        return response

class ServiceEndpoint(GenericEndpoint):
    def __init__(self):
        self.endpoint_serializer = ServiceSerializer
        self.endpoint_model = Service

class CategoryEndpoint(GenericEndpoint):
    def __init__(self):
        self.endpoint_serializer = CategorySerializer
        self.endpoint_model = Category