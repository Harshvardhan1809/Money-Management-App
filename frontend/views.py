from django.shortcuts import render
from django.views.generic import TemplateView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class Home(TemplateView): 
    template_name = "frontend/index.html"

# How does this template view access the html file? 
# -> Django default template loader (django.template.loaders.app_directories.Loader) searches for the keyword "frontend/index.html" in many "templates/" paths
# Hence, adding custom os.path..... to find the html file is uneccessary since the default loader is functional enough