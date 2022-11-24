from django.urls import path, include
from .views import index
urlpatterns = [
    path('', index),
    path('login', index ),
    path('homep', index ),
    path('addticket', index),
    path('tickets', index),
    path('signup', index),
    path('servicerequests', index),
    path('editaccount', index),
    path('addtechnician', index),
    path('ticket', index),
    path('createcomment', index),
    path('addrequest', index),
    path('servicerequests2', index)
]
