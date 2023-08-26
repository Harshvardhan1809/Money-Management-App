from .models import User, Account, Expenditure, Spending
from rest_framework import viewsets, permissions
from .serializers import AccountSerializer, ExpenditureSerializer, SpendingSerializer, UserSerializer
import datetime
from rest_framework.decorators import action, renderer_classes
from rest_framework.renderers import BrowsableAPIRenderer, TemplateHTMLRenderer, JSONRenderer
from django.core import serializers
import json 
from decimal import Decimal

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
        # Get account from user and then expenditure from the account
        req = self.request.data
        print(req)
        account = Account.objects.get(user = self.request.user)
        expenditure = Expenditure.objects.get(account=account)
        expenditure = expenditure
        amount = Decimal(req['amount'].strip(' "'))
        date = req['date'].replace("-", "")
        formatted_date = datetime.date(int(date[0:4]), (10*int(date[4]) + int(date[5])), (10*int(date[6]) + int(date[7])))
        serializer.save(amount=amount, type1=req['type1'], type2=req['type2'], date=formatted_date, note=req['memo'], expenditure=expenditure)


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

            # serializers.serialize only serializes qiuerysets to json 
            data = serializers.serialize("json",data)


        elif (slug == "recent_additions"):
            data = data.filter(expenditure=expenditure)
            data = data.order_by('-date').order_by('-id')
            data = data[:10]
        
            # serializers.serialize only serializes qiuerysets to json 
            data = serializers.serialize("json",data)

        elif (slug == "overview_data"):

            # current day and month
            today_date = datetime.date.today().weekday()
            today_month = datetime.datetime.now().month
            today = datetime.datetime.now().day
            # last month 
            last_month = (today_month-1)%12
            if(last_month == 0) : 
                last_month = 12
            # yesterday 
            yesterday = datetime.datetime.today() - datetime.timedelta(days=1)
            # last week 
            last_week_begin = datetime.datetime.today() - datetime.timedelta( days = (7+today_date) )
            last_week_end = datetime.datetime.today() - datetime.timedelta( days = (today_date) )

            total_today = data.filter(expenditure=expenditure).filter(date__month = today_month).filter(date__day = today)
            total_yesterday = data.filter(expenditure=expenditure).filter(date__month = today_month).filter(date__day = yesterday.day)
            total_last_week = data.filter(expenditure=expenditure).filter(date__gte = last_week_begin).filter(date__lte = last_week_end)
            total_last_month = data.filter(expenditure=expenditure).filter(date__month = last_month)

            t_value = 0
            y_value = 0
            w_value = 0
            m_value = 0

            for i in range(0,len(total_today)): 
                t_value += float(total_today[i].amount)
            for i in range(0,len(total_yesterday)): 
                y_value += float(total_yesterday[i].amount)
            for i in range(0,len(total_last_week)): 
                w_value += float(total_last_week[i].amount)
            for i in range(0,len(total_yesterday)): 
                m_value += float(total_last_month[i].amount)

            overview_data = {
                'total_today': t_value, 
                'total_yesterday': y_value, 
                'total_last_week': w_value, 
                'total_last_month': m_value, 
            }   

            print("Print overview_data")
            print(overview_data)

            data = json.dumps(overview_data)

        elif (slug == "overview_graph"):

            today_month = datetime.datetime.now().month
            overview_graph_data = data.filter(expenditure=expenditure).filter(date__month = today_month)
            data = serializers.serialize("json",overview_graph_data) 


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