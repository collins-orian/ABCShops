'''This file is used to define the urls for the product views
and to connect the views to the urls.'''
from django.urls import path
from base.views.product_views import *


urlpatterns = [
    path('', getProducts, name='products'),
    path('<str:pk>', getProduct, name='product'),
]
