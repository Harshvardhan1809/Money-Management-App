from django.shortcuts import render
from django.views.generic import TemplateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from accounts.models import User
from django.urls import reverse, reverse_lazy

# Create your views here.
class SettingsPage(LoginRequiredMixin, TemplateView): 
    template_name = "settings/settings.html"

class AccountDelete(LoginRequiredMixin, DeleteView): 
    template_name = "settings/account_delete.html"
    model = User
    pk_url_kwarg = "pk"

    def get_success_url(self):
        return reverse("settings:account_delete_complete")

class AccountDeleteComplete(LoginRequiredMixin, TemplateView):
    template_name = "settings/account_delete_complete.html" 
