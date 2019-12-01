from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from trips import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/trips/', views.TripEndpoint.as_view()),
    path('api/trips/<int:pk>', views.TripEndpoint.as_view()),
    path('api/categories/', views.CategoryEndpoint.as_view()),
    path('api/categories/<int:pk>', views.CategoryEndpoint.as_view()),
    path('api/services', views.ServiceEndpoint.as_view()),
    path('api/services/<int:pk>', views.ServiceEndpoint.as_view()),
    path('', TemplateView.as_view(template_name='index.html')),
]
