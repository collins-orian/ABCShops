from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Product


"""This file contains serializers that turn database queries from the database
into json format. Contains each individual serializer for each model"""


# Product serializer
class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
