from django.db import models

class Hotel(models.Model):
    name = models.CharField(
        max_length=300,
        unique=True,
        help_text="The name of the hotel",
    )
    type = models.CharField(
        max_length=300,
        help_text="Type",
    )
    location = models.CharField(
        max_length=300,
        help_text="Location of the hotel",
    )
    cost = models.IntegerField(
        help_text="Total cost of the hotel"
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)

class Transportation(models.Model):
    name = models.CharField(
        max_length=300,
        unique=True,
        help_text="The name of the transportation",
    )
    type = models.CharField(
        max_length=300,
        help_text="Type",
    )
    location = models.CharField(
        max_length=300,
        help_text="Location",
    )
    cost = models.IntegerField(
        help_text="Total cost of the transportation"
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)

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
    hotel = models.ManyToManyField(Hotel)
    transportation = models.ManyToManyField(Transportation)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)


class SelectedTrip(models.Model):
    title = models.CharField(
        max_length=300,        
        help_text="The name of the trip",
        blank=True
    )
    travel_style = models.CharField(
        max_length=300,
        help_text="The type of G Adventures trip",
        blank=True
    )
    destination = models.CharField(
        max_length=300,
        help_text="Initial location of the trip",
        blank=True
    )
    cost = models.CharField(help_text="Total cost of the trip", max_length=300, blank=True)
    total = models.CharField(max_length=300, blank=True)
    duration_days = models.CharField(help_text="How many days this trip runs", max_length=300, blank=True)
    hotelName = models.CharField(max_length=300, blank=True)
    hotelCheckIn = models.CharField(max_length=300, blank=True)
    hotelCheckOut = models.CharField(max_length=300, blank=True)
    hotelCost = models.CharField(max_length=300, blank=True)
    totalHotelDays = models.CharField(max_length=300, blank=True)
    totalhotelCost = models.CharField(max_length=300, blank=True)
    transportationType = models.CharField(max_length=300, blank=True)
    transportationCost = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.title