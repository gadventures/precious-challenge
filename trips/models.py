from django.db import models
# Expand the Trip model
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
    # Add services inside the Trip model
    # Default values are empty and they are not displayed on the frontend
    # The services are not obligatory to fill in
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