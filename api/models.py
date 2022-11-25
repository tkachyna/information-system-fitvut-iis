# File with database models
# IIS 2022/2023
# Author: Lada Krofingerova
# Other project authors: Tadeas Kachyna, Lucia Makaiova
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator
from django.utils import timezone


class User(AbstractUser):
    USER_ROLE_CHOICES = (
        (1, 'citizen'),
        (2, 'technician'),
        (3, 'manager'),
        (4, 'admin'),
    )

    role = models.PositiveSmallIntegerField(choices=USER_ROLE_CHOICES, default=1)
    city = models.CharField(max_length=256)
    street = models.CharField(max_length=256)
    house_number = models.CharField(max_length=256, validators=[RegexValidator("^\d+\/?\d*$")])
    zipcode = models.CharField(max_length=6, validators=[RegexValidator("^\d{3} \d{2}$")])
    phone_number = models.CharField(max_length=11, validators=[RegexValidator("^\d{9}$")])



# Table for tickets
class Ticket(models.Model):
    name = models.CharField(max_length=256)
    description = models.CharField(max_length=1024)
    state = models.CharField(choices=((1, "submitted"), (2, "working on"), (3, "resolved"), (4, "denied")), max_length=256, default=1)
    creation_date_time = models.DateTimeField(default=timezone.now)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="customer")             # on delete behaviour
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name="admin")                # on delete


# Request table
class Request(models.Model):
    description = models.CharField(max_length=256)
    estimated_time = models.FloatField()
    real_time = models.FloatField()
    state = models.CharField(choices=((1, "submitted"), (2, "working on"), (3, "resolved")), max_length=256, default=1)
    creation_date_time = models.DateTimeField(default=timezone.now)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)            # foreign key
    technicians = models.ManyToManyField(User)        # technician-request


# Comment-ticket - weak entity
class TicketComment(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)       # foreign key to tickets
    # id = models.AutoField()                  # autoincrement if possible
    text = models.CharField(max_length=1024)
    creation_date_time = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)           # foreign key to persons

    # this should simulate weak entity
    class Meta:
        unique_together = ('ticket', 'id')


# Request comment table - weak entity
class RequestComment(models.Model):
    request = models.ForeignKey(Request, on_delete=models.CASCADE)
    # id = models.AutoField()              # autoincrement
    text = models.CharField(max_length=1024)
    creation_date_time = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)       # foreign key

    class Meta:
        unique_together = ('request', 'id')


# pictures table
class Picture(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    # id = models.AutoField()             # autoincrement
    url = models.URLField(default="")

    class Meta:
        unique_together = ('ticket', 'id')