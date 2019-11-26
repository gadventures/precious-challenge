from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from trips import views
from trips.views import TripDetailView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.TripList.as_view()),
    path('', TemplateView.as_view(template_name='index.html')),
    path('trip/<int:pk>/', views.TripDetailView.as_view(template_name='trip-detail.html'), name='trip'),
]
