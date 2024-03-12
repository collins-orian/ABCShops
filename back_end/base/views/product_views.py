
from rest_framework.decorators import api_view
from rest_framework.response import Response


from base.models import Product
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    '''This route gets all the products from the database.'''
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    '''This route gets a single product from the database.
    It takes in the id of the product as a parameter.'''
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
