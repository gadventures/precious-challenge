from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from trips import views
from trips.views import TripDetailView

# Configure the get and post requests in the Trip app using automatic URL routing.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.TripList.as_view()),
    path('api/hotels', views.PostHotel.as_view()),
    path('api/transportations', views.PostTransportation.as_view()),
    path('api/accomodations', views.PostAccomodation.as_view()),
    path('', TemplateView.as_view(template_name='index.html')),
    path('trip/<int:pk>/', views.TripDetailView.as_view(), name='trip'),
]
