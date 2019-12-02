from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from trips import views

router = routers.DefaultRouter()
router.register(r'trips', views.TripList, 'trips')
router.register(r'services', views.ServiceList, 'services')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path(
        'trip/<int:id>/services/',
        views.TripList.as_view({'get': 'list_services'})
    ),
    path('', TemplateView.as_view(template_name='index.html')),
]
