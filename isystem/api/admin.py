from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Ticket, Request, TicketComment, RequestComment, Picture
from .models import User
# Register your models here.

class CustomUserAdmin(UserAdmin):   # custom admin with additional attribute role
    model = User
    list_display = ["email", "username", "role"]


admin.site.register(User)
admin.site.register(Ticket)
admin.site.register(Request)
admin.site.register(TicketComment)
admin.site.register(RequestComment)
admin.site.register(Picture)
