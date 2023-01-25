from .models import User, Account, Expenditure, Spending
from rest_framework import viewsets, permissions
from .serializers import AccountSerializer, ExpenditureSerializer, SpendingSerializer, UserSerializer
from datetime import date
 
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

    def get_queryset(self, *args, **kwargs): 

        print("Print self.kwargs", self.kwargs)
        print("Print kwargs", kwargs)   

        data = Spending.objects.all()
        try: 
            slug = kwargs["component"]
        except: 
            slug = ""
        try: 
            user = User.objects.get(id = self.request.user.id)
        except: 
            user = AuthToken.objects.last().user
            print(AuthToken.objects.last())

        account = Account.objects.get(user=user)
        expenditure = Expenditure.objects.get(account=account)

        print("Print the user", self.request.user)

        if(slug == "carousel"): 
            today_month = date.today().month() 
            data = data.filter(expenditure=expenditure).filter(entry__created_at__month = today_month)

        elif (slug == "recent_additions"):
            print("In recent_additions")
            data = data.filter(expenditure=expenditure).filter('-id')[:10]

        return data


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