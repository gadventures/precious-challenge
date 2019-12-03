from django.db import models


class ServiceType(models.Model):
    """
    Store different service types (ex. Hotel, Accommodation, Transportation) so that more can be added, as well as to be able to add type parameters
    """

    name = models.CharField(
        max_length=300, unique=True, help_text="The name of the service type"
    )

    def __str__(self):
        return self.name

class Service(models.Model):
    """
    Store all available services
    """
    
    name = models.CharField(
        max_length=300,
        unique=True,
        help_text="The name of the service",
    )
    location = models.CharField(
        max_length=300,
        help_text="The location of the service",
    )
    type = models.ForeignKey(
        ServiceType,
        on_delete=models.CASCADE
    )
    cost = models.IntegerField(help_text="The cost of the service")

    def __str__(self):
        return self.name

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
    cost = models.IntegerField(
        help_text="Total cost of the trip")

    duration_days = models.IntegerField(help_text="How many days this trip runs")

    # Associated services
    services = models.ManyToManyField(Service)

    def calc_total(self):
        """
        Calculate total cost of the trip including services
        """
        total = self.cost

        for service in self.services.all():
            total += service.cost

        return total
