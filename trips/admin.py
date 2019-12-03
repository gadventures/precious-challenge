from django.contrib import admin
from trips.models import Trip, Service


class TripsAdmin(admin.ModelAdmin):
    # display the trips list by the title
    list_display = ("title", )
    # allow for trips to be searched by the title, duration in days and cost
    search_fields = ["title", "duration_days", "cost"]
class ServiceAdmin(admin.ModelAdmin):
    # display the service list by name
    list_display = ("name", )
    # allowe for trips to be searched by name, location or cost
    search_fields = ["name", "location", "cost"]

admin.site.register(Trip,TripsAdmin)
admin.site.register(Service, ServiceAdmin)
