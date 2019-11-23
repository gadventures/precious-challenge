from django.db import models

class Trip(models.Model):
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

class Service(models.Model):
    service_types = (
        (1, "Hotel"),
        (2, "Accommodations"),
        (3, "Transportation"),
    )
    name = models.CharField(
        max_length=300,
        unique=True,
        help_text="The name of the service",
    )
    location = models.CharField(
        max_length=300,
        help_text="The location of the service",
    )
    type = models.IntegerField(
        choices=service_types,
        help_text="The type of service",
    )
    trip = models.ForeignKey(
        Trip,
        null=True,
        on_delete=models.CASCADE,
        help_text="The trip associated to this service",
    )
    cost = models.IntegerField(help_text="Total cost of the service")