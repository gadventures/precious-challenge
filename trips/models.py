# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class Trip(models.Model):
    # title_field contains the trip name
    title = models.CharField(max_length=300,unique=True)
    # travel_style field contains the type of G Aventures Trip
    travel_style = models.CharField(max_length=300)
    # destination contains the country in which the trip takes place
    destination = models.CharField(max_length=300)
    # cost details how much the trip costs
    cost = models.IntegerField()
    # duration_days details how long the trip is in days
    duration_days = models.IntegerField()
    pass
