'''This file is used to define the urls for the user views
and to connect the views to the urls.'''
from django.urls import path
from base.views.user_views import *


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', registerUser, name='register'),
    path('', getUsers, name='users'),
    path('profile/', getUserProfile, name='user-profile'),
]
