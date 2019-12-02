from django.db import models


class Service(models.Model):
    """
    Store all available services
    """
    types = (
        (1, "Hotel"),
        (2, "Accommodation"),
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
        choices=types,
        help_text="The type of service (Hotel, Accomodation or Transportation)",
    )

    cost = models.IntegerField(help_text="The cost of the service")


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
    duration_days = models.IntegerField(
        help_text="How many days this trip runs")

    # Associated services
    services = models.ManyToManyField(Service)
