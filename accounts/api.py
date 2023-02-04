from .models import User, Account, Expenditure, Spending
from rest_framework import viewsets, permissions
from .serializers import AccountSerializer, ExpenditureSerializer, SpendingSerializer, UserSerializer
import datetime
from rest_framework.decorators import action, renderer_classes
from rest_framework.renderers import BrowsableAPIRenderer, TemplateHTMLRenderer, JSONRenderer
from django.core import serializers
import json 
# Viewset
# necessary to work with routers

# get_queryset -> Basically decides what to do for a GET request
# perform_create -> Decides what to do for a POST request 

# Purpose - No special purpose as of now, just created for the sake of it 
class UserViewSet(viewsets.ModelViewSet): 

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
        #permissions.IsAuthenticated
    ]

    serializer_class = UserSerializer

    def get_queryset(self): 
        return User.objects.all()

    # Not sure how perform_create works since there is no owner 
    # def perform_create(self, serializer): 
    #     serializer.save(owner = self.request.user) 

# Purpose - To retreive information of the account of the user currently logged in 
class AccountViewSet(viewsets.ModelViewSet): 

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    serializer_class = AccountSerializer

    def get_queryset(self): 
        return Account.objects.all()
        #return self.request.user.accounts.all()

    def perform_create(self, serializer): 
        serializer.save(owner = self.request.user) 


class ExpenditureViewSet(viewsets.ModelViewSet): 

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
        #permissions.IsAuthenticated
    ]

    serializer_class = ExpenditureSerializer

    def get_queryset(self): 
        #return self.request.user.spendings.all()
        return Expenditure.objects.all()

    def perform_create(self, serializer): 
        # Create expenditure, one for a object
        serializer.save(account = self.request.user) 


class SpendingViewSet(viewsets.ModelViewSet): 

    permission_classes = [
        #permissions.AllowAny
        #permissions.IsAuthenticated
        permissions.IsAuthenticatedOrReadOnly
    ]

    serializer_class = SpendingSerializer

    def get_queryset(self): 
        return Spending.objects.all()
        #return self.request.user.spendings.all()

    def perform_create(self, serializer): 
        serializer.save(owner = self.request.user) 


class SpendingDataViewSet(viewsets.ModelViewSet): 

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    serializer_class = SpendingSerializer

    # Substitutes for def get_queryset 
    # queryset = Spending.objects.all()
    def get_queryset(self): 
        return Spending.objects.all()
        #return self.request.user.spendings.all()

    @action(detail=True, methods=['get']) 
    @renderer_classes([TemplateHTMLRenderer, JSONRenderer, BrowsableAPIRenderer])
    def component_data(self, *args, **kwargs): 

        print("Print self.kwargs", self.kwargs)

        data = Spending.objects.all()
        try: 
            slug = self.kwargs["component"]
        except: 
            slug = ""

        try: 
            user = User.objects.get(id = self.request.user.id)
        except: 
            user = AuthToken.objects.last().user

        account = Account.objects.get(user=user)
        expenditure = Expenditure.objects.get(account=account)

        if(slug == "carousel"): 
            today_month = datetime.datetime.now().month
            # https://stackoverflow.com/questions/28189442/datetime-current-year-and-month-in-python
            data = data.filter(expenditure=expenditure)
            data = data.filter(date__month = today_month)
            # https://docs.djangoproject.com/en/4.1/topics/db/queries/#queryset-model-example

            print(data)

        elif (slug == "recent_additions"):
            data = data.filter(expenditure=expenditure)
            data = data.order_by('-id')[:10]

        # return data

        # Convert to JSON
        data = serializers.serialize("json",data)

        return Response(data)

    def perform_create(self, serializer): 
        serializer.save(owner = self.request.user) 


# Using generics to create API for functionalities and knox for tokens

from rest_framework import generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterSerializer, LoginSerializer

# Register API
class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        # API sends the below response 
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        # API sends the below response 
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API 
class UserAPI(generics.RetrieveAPIView): 
    
    permission_classes = [
        permissions.IsAuthenticated, 
    ]

    serializer_class = UserSerializer

    # Created the token and sends back the user associated with the token 
    # For the Postman request, do a GET request, in the Header, set Authorization as: Token {token}
    def get_object(self):
        return self.request.user


# # Spending Data API 
# class SpendingDataAPI(generics.RetrieveAPIView)