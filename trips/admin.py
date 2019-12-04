from django.contrib import admin
from trips.models import Trip, Service, ServiceType


class TripsAdmin(admin.ModelAdmin):
    # display the trips list by the title
    list_display = ("title",)
    # allow for trips to be searched by the title, duration in days and cost
    search_fields = ["title", "duration_days", "cost"]


class ServiceAdmin(admin.ModelAdmin):
    # display the service list by name
    list_display = ("name",)
    # allow for trips to be searched by name, location or cost
    search_fields = ["name", "location", "cost"]


class ServiceTypeAdmin(admin.ModelAdmin):
    # display the service type name
    list_display = ("name",)
    # allow searching types by name
    search_fields = ["name"]


admin.site.register(Trip, TripsAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(ServiceType, ServiceTypeAdmin)
