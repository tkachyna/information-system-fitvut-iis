from django.urls import path, include
from .views import index
urlpatterns = [
    path('', index),
    path('login', index ),
    path('homep', index ),
    path('addticket', index),
    path('tickets', index),
    path('signup', index),
    path('editaccount', index),
    path('addtechnician', index),
    path('ticket', index),
    path('usermanagement', index),
    path('createticketcomment', index),
    path('addrequest', index),
    path('servicerequests', index),
    path('servicerequest', index),
    path('createreqcomment', index),
    path('about', index),
]

