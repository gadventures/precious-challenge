from django.db import models

# Expand the Trip model
class Trip(models.Model):
    # Add option to add image url to each trip for better UX
    imageUrl = models.CharField(
        max_length=300,
        help_text="Add thumbnail image to the trip",
        blank=True,
        default =""
    )
    title = models.CharField(
        max_length=300,
        unique=True,
        help_text="The name of the trip",
    )
    travel_style = models.CharField(
        max_length=300,
        help_text="The type of G Adventures trip",
    )
    destination = models.CharField(
        max_length=300,
        help_text="Initial location of the trip",
    )
    cost = models.IntegerField(help_text="Total cost of the trip")
    duration_days = models.IntegerField(help_text="How many days this trip runs")

    # Add services inside the Trip model
    # Default values are empty and they are not displayed on the frontend
    # The services are optional to fill in
    hotel = models.CharField(
        max_length=300,
        help_text="Add Hotel",
        blank=True,
        default =""
    )

    accomodation = models.CharField(
        max_length=300,
        help_text="Add other types of accomodation",
        blank=True,
        default =""
    )
    
    transportation = models.CharField(
        max_length=300,
        help_text="Add transportation method",
        blank=True,
        default =""
    )

## ToDo
# Add new model for each service and link them to a specific trip
# This code creates empty tables in the DB and needs improvement!

# The app will work correctly if this approach is incorporated 
# because then users can add/edit/delete their own services
# Currently users are able to manage all trips, which is not practical. 
# Instead, users should only be able to add/edit/delete their own services


# class Hotel(models.Model):
#     # Relate the hotel service to its Trip
#     trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100,
#         default ="")
#     typeOfService = models.TextField(
#         max_length=64,
#         help_text="The name of the service, e.g. hotel, accomodation or transportation",
#         default ="hotel"
#     )
#     location = models.CharField(
#         max_length=100,
#         default =""
#     )
#     cost = models.IntegerField(help_text="Total cost of the trip")
    
# class Accomodation(models.Model):
#     # Relate the service to its Trip
#     trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100,
#         default ="")
#     typeOfService = models.TextField(
#         max_length=64,
#         help_text="The name of the service, e.g. hotel, accomodation or transportation",
#         default ="accomodation"
#     )
#     location = models.CharField(
#         max_length=100,
#         default =""
#     )
#     cost = models.IntegerField(help_text="Total cost of the trip")

# class Transportation(models.Model):
#     # Relate the service to its Trip
#     trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100,
#         default ="")
#     typeOfService = models.TextField(
#         max_length=64,
#         help_text="The name of the service, e.g. hotel, accomodation or transportation",
#         default ="transportation"
#     )
#     location = models.CharField(
#         max_length=100,
#         default =""
#     )
#     cost = models.IntegerField(help_text="Total cost of the trip")