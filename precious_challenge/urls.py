from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from trips import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.TripList.as_view()),
    path('hotels/', views.HotelList.as_view()),
    path('transportation/', views.TransportationList.as_view()),
    path('', TemplateView.as_view(template_name='index.html')),
]
