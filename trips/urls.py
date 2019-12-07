from django.urls import path
from .views import TripList, HotelList, TransportationList, PostSelectedTrips, GetListSelectedTrips, DeleteListSelectedTrips

urlpatterns = [
    path('', TripList.as_view()), # return json for all trips with services
    path('post/', PostSelectedTrips.as_view()), # used for save new trip with selected services
    path('get/', GetListSelectedTrips.as_view()), # used for get trip with selected services
    path('del/', DeleteListSelectedTrips.as_view()), # used for delete all trip with selected services
]
