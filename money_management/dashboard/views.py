from django.shortcuts import render
from django.views.generic import TemplateView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class Home(LoginRequiredMixin, TemplateView): 
    template_name = "dashboard/home.html"