# File with database models
# IIS 2022/2023
# Author: Lada Krofingerova
# Other project authors: Tadeas Kachyna, Lucia Makaiova

from django.db import models


# Table for persons
class Person(models.Model):
    name = models.CharField(max_length=256)
    surname = models.CharField(max_length=256)
    city = models.CharField(max_length=256)
    street = models.CharField(max_length=256)
    number_of_house = models.CharField(max_length=256)  # regex??
    zipcode = models.CharField(max_length=6)            # regex: 3 nums, space, 2 nums
    phone_number = models.CharField(max_length=11)      # regex: 3 nums, space, 3 nums, space, 3 nums
    email = models.EmailField()
    role = models.CharField(max_length=256)             # try choices -> technician, city_admin, citizen
    login = models.CharField(max_length=256)
    password = models.CharField(max_length=256)


# Table for tickets
class Ticket(models.Model):
    name = models.CharField(max_length=256)
    description = models.CharField(max_length=1024)
    state = models.CharField(max_length=256)                                      # which states? ->
    customer_id = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="customer")             # on delete behaviour
    admin_id = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="admin")                # on delete


# Request table
class Request(models.Model):
    description = models.CharField(max_length=256)
    estimated_time = models.FloatField()
    real_time = models.FloatField()
    state = models.CharField(max_length=256)        # as states
    ticket_id = models.ForeignKey(Ticket, on_delete=models.CASCADE)            # foreign key
    technicians = models.ManyToManyField(Person)        # technician-request


# Comment-ticket - weak entity
class TicketComment(models.Model):
    ticket_id = models.ForeignKey(Ticket, on_delete=models.CASCADE)       # foreign key to tickets
    # id = models.AutoField()                  # autoincrement if possible
    text = models.CharField(max_length=1024)
    creation_date_time = models.DateTimeField()
    author_id = models.ForeignKey(Person, on_delete=models.CASCADE)           # foreign key to persons

    # this should simulate weak entity
    class Meta:
        unique_together = ('ticket_id', 'id')


# Request comment table - weak entity
class RequestComment(models.Model):
    request_id = models.ForeignKey(Request, on_delete=models.CASCADE)
    # id = models.AutoField()              # autoincrement
    text = models.CharField(max_length=1024)
    creation_date_time = models.DateTimeField()
    author_id = models.ForeignKey(Person, on_delete=models.CASCADE)       # foreign key

    class Meta:
        unique_together = ('request_id', 'id')


# pictures table
class Picture(models.Model):
    ticket_id = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    # id = models.AutoField()             # autoincrement
    image = models.ImageField()

    class Meta:
        unique_together = ('ticket_id', 'id')
