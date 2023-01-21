"""money_management URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include 
import accounts.views as accounts 
import frontend.views as frontend 
from django.conf.urls.static import static
from money_management.settings import MEDIA_URL, MEDIA_ROOT
from money_management.settings import STATIC_URL
from rest_framework import routers; 
from knox import views as knox_views
from accounts.api import UserViewSet, AccountViewSet, ExpenditureViewSet, SpendingViewSet, RegisterAPI, LoginAPI, UserAPI
import re

# API endpoints 
router = routers.DefaultRouter()
router.register('api/user', UserViewSet, 'accounts')
router.register('api/account', AccountViewSet, 'accounts')
router.register('api/expenditure', ExpenditureViewSet, 'expenditure')
router.register('api/spending', SpendingViewSet, 'spending')

auth_url_patterns = [
    path('api/auth', include('knox.urls')), 
    path('api/auth/register', RegisterAPI.as_view()), 
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()), 
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout")

]


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('accounts/', include("accounts.urls")), 
   
    #path('', include("dashboard.urls")), 
    #path('settings/', include("settings.urls")), 
]

urlpatterns += static(MEDIA_URL,document_root=MEDIA_ROOT)
urlpatterns += static(STATIC_URL)

# Result close just cant detect api/(paths)
urlpatterns +=  re_path(r'(?![^(api)[/a-zA-Z0-9]])', include("frontend.urls")), 
 
#Include the API endpoints 
urlpatterns += router.urls 
urlpatterns += auth_url_patterns

#urlpatterns += static('media/profile/default')

# Regex testing 
# pattern = r
# e.compile(r'(?![^(api)])')
# sentence = 'http://127.0.0.1:8000/api/expenditure/'
# urlpatterns +=  re_path(r'^(?!(api)$)(?:[\s\S])', include("frontend.urls")), 
# matches = pattern.finditer(sentence)
# print("Does match?")
# for match in matches: 
#     print(match)