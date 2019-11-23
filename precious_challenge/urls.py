from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from trips import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/trips', views.TripList.as_view()),
    path('api/services', views.service_api),
    path('', TemplateView.as_view(template_name='index.html')),
]
