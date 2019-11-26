from django.contrib import admin
from trips.models import Trip
from trips.models import Hotel
from trips.models import Accomodation
from trips.models import Transportation

class TripsAdmin(admin.ModelAdmin):
    # display the trips list by the title
    list_display = ("title", )
    # allow for trips to be searched by the title, duration in days and cost
    search_fields = ["title", "duration_days", "cost"]

class HotelsAdmin(admin.ModelAdmin):
    model = Trip
    # display the trips list by the title
    list_display = ['get_name', ]

    def get_name(self, obj):
        return obj.trip.title
    get_name.admin_order_field  = 'trip'  #Allows column order sorting
    get_name.short_description = 'Trip Name'  #Renames column head

class AccomodationsAdmin(admin.ModelAdmin):
    model = Trip
    # display the trips list by the title
    list_display = ['get_name', ]

    def get_name(self, obj):
        return obj.trip.title
    get_name.admin_order_field  = 'trip'  #Allows column order sorting
    get_name.short_description = 'Trip Name'  #Renames column head

class TransportationsAdmin(admin.ModelAdmin):
    model = Trip
    # display the trips list by the title
    list_display = ['get_name', ]

    def get_name(self, obj):
        return obj.trip.title
    get_name.admin_order_field  = 'trip'  #Allows column order sorting
    get_name.short_description = 'Trip Name'  #Renames column head

admin.site.register(Trip,TripsAdmin)
admin.site.register(Hotel, HotelsAdmin)
admin.site.register(Accomodation, AccomodationsAdmin)
admin.site.register(Transportation, TransportationsAdmin)

