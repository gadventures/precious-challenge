# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
# import the Trip model
from trips.models import Trip


class TripsAdmin(admin.ModelAdmin):
    # display the trips list by the title
    list_display = ("title",)
    # allow for trips to be searched by the title, duration in days and cost
    search_fields = ["title","duration_days","cost"]

admin.site.register(Trip,TripsAdmin)


