from rest_framework.serializers import ModelSerializer
from api.models import Ticket, User

class TicketSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'