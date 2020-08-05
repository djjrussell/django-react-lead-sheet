from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('main/', views.main),
    path('sale/<int:lead_id>', views.sale_screen),
]

