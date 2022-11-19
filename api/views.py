from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from matplotlib.patheffects import TickedStroke
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
# Create your views here.

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from stack_data import Serializer

import json
from .serializers import ModelSerializer, TicketSerializer
from .models import Ticket, User
#make entities available as SQLAlchemy models

# listing view for testing queries
def listing(request):
    data = {
        "users" : User.query().filter(User.role == 1),
    }

    return render(request, "listing.html", data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
        token['role'] = 'admin' if user.username == 'admin' else 'citizen'
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)


@api_view(['POST'])
def regUser(request):
    data = json.loads(request.body)
    user = User.objects.create_user(
                            username=data['user'],
                            email=data['email'],
                            password=data['password'],
                            city=['city'],
                            street=['street'],
                            house_number=['house_number'])
    return HttpResponse()