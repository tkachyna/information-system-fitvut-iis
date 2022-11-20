from django.urls import path, include
from .views import index
urlpatterns = [
    path('', index),
    path('login', index ),
    path('homep', index ),
    path('reportfailure', index),
    path('listoffailures', index),
    path('signup', index),
    path('servicerequests', index)
]
