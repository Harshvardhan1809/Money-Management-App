from django.urls import path
from .views import *
from django.conf.urls.static import static
from money_management.settings import MEDIA_URL, MEDIA_ROOT

app_name = "settings"

urlpatterns = [
    path('', SettingsPage.as_view(), name="settings"), 
    path('<pk>/account_delete/', AccountDelete.as_view(), name="account_delete"), 
    path('account/delete/complete', AccountDeleteComplete.as_view(), name="account_delete_complete"), 

] + static(MEDIA_URL,document_root=MEDIA_ROOT)