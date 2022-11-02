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

from .serializers import ModelSerializer, TicketSerializer
from .models import Ticket, Person

Ticket = Ticket.sa
Person = Person.sa


def listing(request):
    data = {
        "persons": Person.query().filter(Person.user.has(role=2)),
    }

    return render(request, "listing.html", data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
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




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTickets(request):
    user = request.user
    ticket = user.note_set.all()
    serializer = TicketSerializer(ticket, many=True)
    return Response(serializer.data)