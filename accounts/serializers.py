from rest_framework import serializers 
from .models import Account, Spending, Expenditure, User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = User
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = Account
        fields = '__all__'

class SpendingSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = Spending
        fields = ('amount', 'type1', 'type2', 'date','note')

class ExpenditureSerializer(serializers.ModelSerializer): 

    # Not settings fields as '__all__' since expenditure type can't be sent through axios 

    class Meta: 
        model = Expenditure
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):   

    class Meta: 
        model = User
        fields = ('id', 'email', 'password') #Dont know why we dont need password1 and password2 

    def create(self, validated_data): 
        user = User.objects.create_user(email = validated_data['email'], password = validated_data['password'])
        return user 

class LoginSerializer(serializers.Serializer):   

    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data): 
        user = authenticate(**data)
        if(user and user.is_active): 
            return user
        raise serializers.ValidationError("Incorrect Credentials")
