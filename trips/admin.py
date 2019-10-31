from django.contrib import admin
from trips.models import Trip, Hotel, Transportation


class TripsAdmin(admin.ModelAdmin):
    # display the trips list by the title
    list_display = ("title", )
    # allow for trips to be searched by the title, duration in days and cost
    search_fields = ["title", "duration_days", "cost"]

admin.site.register(Trip,TripsAdmin)

class HotelsAdmin(admin.ModelAdmin):
    # display the hotel list by the name
    list_display = ("name", )
    # allow for hotels to be searched by the name, location and cost
    search_fields = ["name", "location", "cost"]

admin.site.register(Hotel, HotelsAdmin)

class TransportationAdmin(admin.ModelAdmin):
    # display the transportation list by the name
    list_display = ("name", )
    # allow for transportation to be searched by the name, location and cost
    search_fields = ["name", "location", "cost"]

admin.site.register(Transportation, TransportationAdmin)