from django.contrib import admin
from trips.models import Trip, Category, Service


class TripsAdmin(admin.ModelAdmin):
    # display the trips list by the title
    list_display = ("title", )
    # allow for trips to be searched by the title, duration in days and cost
    search_fields = ["title", "duration_days", "cost"]

class CategoryAdmin(admin.ModelAdmin):
    # display the trips list by their display_name
    list_display = ("display_name", )
    # allow for trips to be searched by their display_name
    search_fields = ["display_name"]

class ServiceAdmin(admin.ModelAdmin):
    # display the trips list by their name
    list_display = ("name", )
    # allow for trips to be searched by their name, location and cost
    search_fields = ["name", "location", "cost"]

admin.site.register(Trip,TripsAdmin)
admin.site.register(Category,CategoryAdmin)
admin.site.register(Service,ServiceAdmin)
