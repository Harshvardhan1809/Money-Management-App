from django.urls import path
from .views import *
from django.conf.urls.static import static
from money_management.settings import MEDIA_URL, MEDIA_ROOT

app_name = "dashboard"

urlpatterns = [
    path('', Home.as_view(), name="home"), 

] + static(MEDIA_URL,document_root=MEDIA_ROOT)