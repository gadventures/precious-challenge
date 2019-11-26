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

    def __str__(self):
        return '%s' % (self.title)


# Add new model for each service and link it to the corresponding trip

# Allow users to add/edit/delete services without modifying the trips

class Hotel(models.Model):
    # Relate the hotel service to its Trip
    trip = models.ForeignKey(Trip, related_name='hotels', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100)
    typeOfService = models.TextField(
        max_length=64,
        help_text="The name of the service, e.g. hotel, accomodation or transportation")
    location = models.CharField(
        max_length=100)
    cost = models.IntegerField(help_text="Total cost of the trip")

    def __str__(self):
        return '%s' % (self.name)

class Accomodation(models.Model):
    # Relate the service to its Trip
    trip = models.ForeignKey(Trip, related_name='accomodations', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100)
    typeOfService = models.TextField(
        max_length=64,
        help_text="The name of the service, e.g. hotel, accomodation or transportation",
        default ="accomodation")
    location = models.CharField(
        max_length=100)
    cost = models.IntegerField(help_text="Total cost of the trip")

    def __str__(self):
        return '%s' % (self.name)

class Transportation(models.Model):
    # Relate the service to its Trip
    trip = models.ForeignKey(Trip, related_name='transportations', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100,
        default ="")
    typeOfService = models.TextField(
        max_length=64,
        help_text="The name of the service, e.g. hotel, accomodation or transportation",
        default ="transportation"
    )
    location = models.CharField(
        max_length=100,
        default =""
    )
    cost = models.IntegerField(help_text="Total cost of the trip")

    def __str__(self):
        return '%s' % (self.name)