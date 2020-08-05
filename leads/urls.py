from django.urls import path
from . import views


urlpatterns = [
    path('api/lead/', views.LeadListCreate.as_view()),
    path('api/company/', views.CompanyListCreate.as_view()),
    path('api/user/', views.UserListCreate.as_view()),
    path('api/init', views.init),
    path('api/login', views.login),
    path('api/addEditLead', views.add_edit_lead),
    path('api/removeLeads', views.remove_leads),
    path('api/sales', views.get_sales),
]

