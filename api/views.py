from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from matplotlib.patheffects import TickedStroke
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
# Create your views here.

from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from stack_data import Serializer

import json
from .serializers import ModelSerializer, TicketSerializer
from .models import Ticket, User

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
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
                            city=data['city'],
                            street=data['street'],
                            house_number=data['house_number'],
                            zipcode=data['zipcode'],
                            phone_number=data['phone_number'])
    return HttpResponse()


@api_view(['POST'])
def createTicket(request):
    db = create_engine("postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)

    session = Session()
    ticket = Ticket.sa
    data = json.loads(request.body)
    # print(data['text'])
    test = ticket(description=data['description'], name="Name", state="working_on", customer_id_id=4, admin_id_id=3)
    # print(test.description)
    session.add(test)
    session.commit()

    # tickets = ticket.query().all()
    # print(tickets)
    test_as_dic = {c.name: getattr(test, c.name) for c in ticket.__table__.columns}
    # print(test_as_dic)
    return Response(data=test_as_dic, status=status.HTTP_200_OK)