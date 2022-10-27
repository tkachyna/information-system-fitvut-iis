from rest_framework.serializers import ModelSerializer
from api.models import Ticket

class TicketSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'