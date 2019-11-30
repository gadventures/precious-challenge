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

    def calculate_sale_price(self):
        """
        Calculate the sale price of the trip from its base cost and services
        """
        # start with the base cost
        sale_price = self.cost
        
        # add up the costs of all of its services
        for service in self.services.all():
            sale_price += service.cost

        # return the total price of the trip
        return sale_price

class Category(models.Model):
    """
    Keeping the categories of trips in a seperate table for future configuration.
    To add a new category add a new record to this table.
    """
    display_name = models.CharField(
        max_length=300,
        unique=True,
        help_text="the name of the service category"
    )

class Service(models.Model):
    """
    Will store all new services for each trip.
    These services should have a name, a location, a type and a cost.
    """
    name = models.CharField(
        max_length=300,
        unique=True,
        help_text="the name of the trip"
    )
    # Assuming an address is sufficient for the location for now
    # In future iterations, this could be combined with a GeometryField
    # Or the one location field could be split into many address inputs
    # (zip code, city, etc)
    location = models.CharField(
        max_length=300,
        help_text="the location of the trip as an address"
    )
    # An integer was used for the cost of trips.
    # Assuming therefore that its ok to use an integer here as well
    cost = models.IntegerField(help_text="The cost of the service")
    category = models.ForeignKey(
        Category,
        related_name='services',
        on_delete=models.CASCADE,
        help_text=" reference of what category of service this is"
    )
    trip = models.ForeignKey(
        Trip,
        related_name='services',
        on_delete=models.CASCADE,
        help_text="reference to the trip this service belongs to"
    )
