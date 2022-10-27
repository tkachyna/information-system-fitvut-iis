from django.contrib import admin
from .models import Person, Ticket, Request, TicketComment, RequestComment, Picture
# Register your models here.
admin.site.register(Person)
admin.site.register(Ticket)
admin.site.register(Request)
admin.site.register(TicketComment)
admin.site.register(RequestComment)
admin.site.register(Picture)
