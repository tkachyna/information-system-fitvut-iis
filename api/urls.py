from django.urls import path, include
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('registrateUser', views.regUser),
    path('accounts/', include('django.contrib.auth.urls')),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('createTicket', views.createTicket),
    path('commentTicket', views.postTicketComment),
    path('getUserID/', views.getUserID),
    path('changeUserInfo/', views.changeUserInfo),
    path('createRequest', views.createRequest),
    path('requestComment', views.postRequestComment),
    path('getTickets', views.getTickets),
    path('getMyTickets', views.getMyTickets),
    path('getTicket', views.getTicket),
    path('editRequest', views.editRequest),
    path('getMyRequests/', views.getMyRequests),
    path('getRequest/', views.getRequest),
    path('getUsers/', views.getUsers),
    path('editTicket', views.editTicket),
    path('getTicketComments', views.getTicketComments),
    path('editUserRole', views.editUserRole),
    path('deleteTicket', views.deleteTicket),
    path('getRequests', views.getRequests),
    path('deleteRequest', views.deleteRequest),
    path('getRequestComments', views.getRequestComments),
    path('deleteAccount', views.deleteAccount),
    path('changePassword', views.changePassword),
]
