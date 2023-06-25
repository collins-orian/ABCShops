from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


from .models import Product
from .products import products
from .serializers import ProductSerializer


# Create your views here.


# gets routes for the api routes
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/', '/api/products/create/',
        '/api/products/upload/', '/api/products/<id>/reviews/',
        '/api/products/top/', '/api/products/<id>/',
        '/api/products/delete/<id>/', '/api/products/<update>/<id>/'
    ]

    # returns the routes from the list of available api routes
    return Response(routes)


# gets products from the api
@api_view(['GET'])
def getProducts(request):

    # query Products model and get all data from it
    product = Product.objects.all()
    # serializer, takes in the query varuable and converts it to json format.
    # the many parameter is set to true if multiple products are serialized.
    # it is set to false when the data is just one
    serializer = ProductSerializer(product, many=True)

    # returns response from serialised data from database
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
