from django.urls import path
from . import views

appname = "frontend"

urlpatterns = [
    path('', views.Home.as_view())
]