
"""This file contains serializers that turn database queries from the database
into json format. Contains each individual serializer for each model"""

from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class UserSerializer(ModelSerializer):
    '''This class is used to serialize the user model.'''

    name = SerializerMethodField(read_only=True)
    isAdmin = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'isAdmin']

    def get_isAdmin(self, obj):
        '''This method checks if the user is an admin. If the user is an admin,
        it returns true. If the user is not an admin, it returns false.'''
        return obj.is_staff

    def get_name(self, obj):
        '''This method gets the name of the user. If the user has no name,
        it returns the email of the user.'''
        name = obj.first_name + ' ' + obj.last_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    '''This class is used to serialize the user model with the token.'''

    token = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'isAdmin', 'token']

    def get_token(self, obj):
        '''This method gets the token of the user.
        It returns the token as a string.'''
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
