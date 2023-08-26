from django.urls import path, include
from .views import *
from django.conf.urls.static import static
from money_management.settings import MEDIA_URL, MEDIA_ROOT
from rest_framework import routers; 
from accounts.api import AccountViewSet, ExpenditureViewSet, SpendingViewSet, RegisterAPI

app_name = "accounts"

urlpatterns = [
    path('accountview/', AccountView.as_view(), name="account_view"), 
    path('login/', Login.as_view(), name="login"), 
    path('account_create/', AccountCreation.as_view(), name="account_create"),
    path('account_update/<slug>/', AccountUpdate.as_view(), name="account_update"), 
    path('user_create/', UserCreation.as_view(), name="user_create"),
    path('user_create_done/', UserCreateDone.as_view(), name='user_create_done'),
    path('user_create/complete/<token>/', UserCreateComplete.as_view(), name='user_create_complete'),
] 