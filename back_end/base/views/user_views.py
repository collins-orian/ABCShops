from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    '''This class is used to create a custom token serializer
    that returns the username and email of the user when the
    token is generated. it uses the validate method to get the
    username and email of the user. it then returns the data
    as a json object. '''

    def validate(self, attrs):
        data = super().validate(attrs)
        # gets the data of the user that os logged in
        serializer = UserSerializerWithToken(self.user).data
        # adds the data to the data object
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    '''This class allows us to use the custom view we created
    to encode the token.'''

    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    '''This route is used to register a new user. It takes in the
    username, email, password and returns the user data and token
    as a json object.'''
    data = request.data
    try:
        user = User.objects.create(
            username=data['email'],
            email=data['email'],
            first_name=data['name']
        )
        user.set_password(data['password'])
        user.save()
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=400)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    '''This route gets all the users from the database.'''
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    '''This route gets the user profile of the user that is logged in.'''
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
