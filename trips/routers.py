from rest_framework import routers
from trips import views

# https://www.django-rest-framework.org/api-guide/routers
# Automatically generate urls to fetch trips, services and handle additional actions
router = routers.DefaultRouter()

# List all trips, view a specific trip and corresponding services
router.register(
    r'trips',
    views.TripsViewSet,
    basename='trip'
)

# List all services
router.register(
    r'services',
    views.ServicesViewSet,
    basename='service'
)

# List all service types
router.register(
    r'service-types',
    views.ServiceTypesViewSet,
    basename='service-type'
)
