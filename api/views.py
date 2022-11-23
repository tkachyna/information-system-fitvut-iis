from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from matplotlib.patheffects import TickedStroke
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.utils import timezone
# Create your views here.

from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from stack_data import Serializer

import json
from .serializers import ModelSerializer, TicketSerializer, UserSerializer
from .models import Ticket, User, TicketComment, Request, RequestComment, Picture

from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
#make entities available as SQLAlchemy models
User = User.sa
# listing view for testing queries


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
        token['role'] = user.role
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)


@api_view(['POST'])
def regUser(request):
    from .models import User
    data = json.loads(request.body)
    user = User.objects.create_user(
                            username=data['user'],
                            email=data['email'],
                            password=data['password'],
                            city=data['city'],
                            street=data['street'],
                            house_number=data['house_number'],
                            zipcode=data['zipcode'],
                            phone_number=data['phone_number'])
    return HttpResponse()

@api_view(['POST'])
def getUserID(request):
    data = json.loads(request.body)
    print(data['id'])
    db = create_engine("postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    stmt = select(User).where(User.id == data['id'])
    result = session.execute(stmt).all()
    print(result[0])
    a = result[0][0]
    serializer = UserSerializer(a)
    db.dispose()
    return Response(serializer.data)

@api_view(['POST'])
def changeUserInfo(request):
    data = json.loads(request.body)
    owner = request.user
    owner.username = data['user']
    owner.email = data['email']
    owner.city = data['city']
    owner.street = data['street']
    owner.zipcode = data['zipcode']
    owner.phone_number = data['phone_number']
    owner.save()
    return HttpResponse()

@api_view(['POST'])
def createTicket(request):
    db = create_engine("postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    ticket = Ticket.sa
    data = json.loads(request.body)
    url = data['url']
    # user = User.sa
    u = session.query(User).filter(User.id == data['id'])
    print(type(u))
    if u.count() == 0:
        db.dispose()
        return Response(data={'Not existing citizen!!'}, status=status.HTTP_400_BAD_REQUEST)
    if u[0].role != 1:
        db.dispose()
        return Response(data={'User is not citizen!!'}, status=status.HTTP_400_BAD_REQUEST)

    # print(data['text'])
    try:
        # kontrola, ze je customer citizen a admin spravce??
        new_ticket = ticket(description=data['description'], name=data['name'], state=1, customer_id=data['id'], admin_id=3,
                      creation_date_time=timezone.now())
        # print(new_ticket.description)
        session.add(new_ticket)
        session.commit()
        if url != "":
            picture = Picture.sa
            try:
                p = picture(ticket_id=new_ticket.id, url=url)
                session.add(p)
                session.commit()
            except:
                db.dispose()
                return Response("Invalid url", status=status.HTTP_400_BAD_REQUEST)


        # tickets = ticket.query().all()
        # print(tickets)
        data = {c.name: getattr(new_ticket, c.name) for c in ticket.__table__.columns}
        # print(test_as_dic)
        db.dispose()
        return Response(data=data, status=status.HTTP_200_OK)
    except:
        db.dispose()
        return Response(data={'Incorrect data'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getTickets(request):
    ticket = Ticket.sa
    tickets = ticket.query().all()
    data = [{c.name: getattr(x, c.name) for c in ticket.__table__.columns} for x in tickets]
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getMyTickets(request):
    ticket = Ticket.sa
    params = request.query_params.dict()
    id = params['id']
    tickets = ticket.query().filter(ticket.customer_id == id)
    data = [{c.name: getattr(x, c.name) for c in ticket.__table__.columns} for x in tickets]
    return Response(data=data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getTicket(request):
    ticket = Ticket.sa
    params = request.query_params.dict()
    id = params['id']
    try:
        t = ticket.query().filter(ticket.id == id)[0]
        data = {c.name: getattr(t, c.name) for c in ticket.__table__.columns}
        return Response(data=data, status=status.HTTP_200_OK)
    except:
        return Response(data={"Invalid ticket id"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getTicketComments(request):
    ticket_comment = TicketComment.sa
    params = request.query_params.dict()
    id = params['id']
    tc = ticket_comment.query().filter(ticket_comment.ticket_id == id)
    data = [{c.name: getattr(x, c.name) for c in ticket_comment.__table__.columns} for x in tc]
    return Response(data=data, status=status.HTTP_200_OK)

@api_view(['POST'])
def postTicketComment(request):
    ticket_comment = TicketComment.sa
    # user = User.sa
    ticket = Ticket.sa

    db = create_engine(
        "postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    data = json.loads(request.body)
    u = session.query(User).filter(User.id == data['author_id'])
    if u.count() == 0:
        #session.close()
        db.dispose()
        return Response(data={'Incorrect user'}, status=status.HTTP_400_BAD_REQUEST)

    t = session.query(ticket).filter(ticket.id == data['ticket_id'])
    if t.count() == 0:
        #session.close()
        db.dispose()
        return Response(data={'Incorrect ticket'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        tc = ticket_comment(ticket_id=data['ticket_id'], text=data['text'], creation_date_time=timezone.now(),
                            author_id=data['author_id'])
        session.add(tc)
        db.dispose()
        session.commit()
        serialized = {c.name: getattr(tc, c.name) for c in ticket_comment.__table__.columns}
        return Response(data=serialized, status=status.HTTP_200_OK)
    except:
        db.dispose()
        return Response(data={'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def createRequest(request):
    db = create_engine("postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    req = Request.sa
    ticket = Ticket.sa
    data = json.loads(request.body)
    # valid user check
    u = session.query(User).filter(User.id == data['id'])
    print(type(u))
    if u.count() == 0:
        db.dispose()
        return Response(data={'Not existing citizen!!'}, status=status.HTTP_400_BAD_REQUEST)
    if u[0].role != 4:  #manager
        db.dispose()
        return Response(data={'User is not manager!!'}, status=status.HTTP_400_BAD_REQUEST)
    # valid ticket check
    t = session.query(ticket).filter(ticket.id == data['ticket_id'])
    if t.count() == 0:
        db.dispose()
        return Response(data={'Assign valid ticket!!'}, status=status.HTTP_400_BAD_REQUEST)
    # technician assign check -not necessary?
    try:
        r = req(description=data['description'], state=1, estimated_time=0, real_time=0, ticket_id=data['ticket_id'], creation_date_time=timezone.now())
        session.add(r)
        session.commit()

        r_serialized = {c.name: getattr(r, c.name) for c in req.__table__.columns}
        db.dispose()
        return Response(data=r_serialized, status=status.HTTP_200_OK)
    except:
        db.dispose()
        return Response(data={'Incorect data'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def postRequestComment(request):
    db = create_engine(
        "postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    data = json.loads(request.body)
    req = Request.sa
    request_comment = RequestComment.sa
    # valid user check
    u = session.query(User).filter(User.id == data['author_id'])
    if u.count() == 0:
        #session.close()
        db.dispose()
        return Response(data={'Incorrect user'}, status=status.HTTP_400_BAD_REQUEST)
    if u[0].role != 4:  #change to manager (3)
        #session.close()
        db.dispose()
        return Response(data={'Incorrect user'}, status=status.HTTP_400_BAD_REQUEST)
    # valid request check
    r = session.query(req).filter(req.id == data['request_id'])
    if r.count() == 0:
        #session.close()
        db.dispose()
        return Response(data={'Incorrect request'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        rc = request_comment(request_id=data['request_id'], text=data['text'], creation_date_time=timezone.now(),
                            author_id=data['author_id'])
        session.add(rc)
        db.dispose()
        session.commit()
        rc_serialized = {c.name: getattr(rc, c.name) for c in request_comment.__table__.columns}
        return Response(data=rc_serialized, status=status.HTTP_200_OK)
    except:
        db.dispose()
        return Response(data={'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def editRequest(request):
    db = create_engine(
        "postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    req = Request.sa
    ticket = Ticket.sa
    data = json.loads(request.body)
    # valid user check
    u = session.query(User).filter(User.id == data['author_id'])
    if u.count() == 0:
        # session.close()
        db.dispose()
        return Response(data={'Incorrect user'}, status=status.HTTP_400_BAD_REQUEST)
    if u[0].role != 4:  # change to manager (3)
        # session.close()
        db.dispose()
        return Response(data={'Incorrect user'}, status=status.HTTP_400_BAD_REQUEST)
    # valid request check
    r = session.query(req).filter(req.id == data['id'])
    if r.count() == 0:
        # session.close()
        db.dispose()
        return Response(data={'Incorrect request'}, status=status.HTTP_400_BAD_REQUEST)
    # technician assign check -not necessary?
    try:
        session.query(req).filter(req.id == data['id']).update({"description": data['description'], "state": data['state'], "estimated_time": data['estimated_time'], "real_time": data['real_time'], "ticket_id":data['ticket_id']})
        session.commit()
        r = session.query(req).filter(req.id == data['id'])
        r_serialized = {c.name: getattr(r[0], c.name) for c in req.__table__.columns}
        db.dispose()
        return Response(data=r_serialized, status=status.HTTP_200_OK)
    except:
        db.dispose()
        return Response(data={'Incorect data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getMyRequests(request):
    req = Request.sa
    params = req.query_params.dict()
    id = params['id']
    reqs = req.query().filter(req.customer_id == id)
    data = [{c.name: getattr(x, c.name) for c in req.__table__.columns} for x in reqs]
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getRequest(request):
    req = Request.sa
    params = request.query_params.dict()
    id = params['id']
    try:
        r = req.query().filter(req.id == id)[0]
        data = {c.name: getattr(r, c.name) for c in req.__table__.columns}
        return Response(data=data, status=status.HTTP_200_OK)
    except:
        return Response(data={"Invalid ticket id"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getUsers(request):
    from .models import User
    users = User.objects.all()
    print(users[0])
    serializer = UserSerializer(users, many=True)
    #erializer = [{c.name: getattr(x, c.name) for c in User.__table__.columns} for x in users]
    return Response(data=serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def editTicket(request):
    db = create_engine(
        "postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    ticket = Ticket.sa
    data = json.loads(request.body)
    # valid user check
    u = session.query(User).filter(User.id == data['author_id'])
    if u.count() == 0:
        # session.close()
        db.dispose()
        return Response(data={'Incorrect user'}, status=status.HTTP_400_BAD_REQUEST)
    if u[0].role != 4:  # change to manager (3)
        # session.close()
        db.dispose()
        return Response(data={'Incorrect user'}, status=status.HTTP_400_BAD_REQUEST)
    # valid ticket check
    t = session.query(ticket).filter(ticket.id == data['id'])
    if t.count() == 0:
        # session.close()
        db.dispose()
        return Response(data={'Incorrect ticket'}, status=status.HTTP_400_BAD_REQUEST)
    # technician assign check -not necessary?
    try:
        session.query(ticket).filter(ticket.id == data['id']).update({"state": data['state']})
        session.commit()
        t = session.query(ticket).filter(ticket.id == data['id'])
        r_serialized = {c.name: getattr(t[0], c.name) for c in ticket.__table__.columns}
        db.dispose()
        return Response(data=r_serialized, status=status.HTTP_200_OK)
    except:
        db.dispose()
        return Response(data={'Incorect data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def editUserRole(request):
    data = json.loads(request.body)
    db = create_engine(
        "postgresql://sjveswfknevejv:9e0fa8e636ec37e3291efd037869aa17e7a647aaaefa6cd388a3f6b06daaa21f@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d9qsrplp2cv1ao")
    Session = sessionmaker(bind=db)
    session = Session()
    session.query(User).filter(User.id == data['id']).update(
        {"role": data['role']})
    session.commit()
    db.dispose()
    return Response(data={'User role changed'}, status=status.HTTP_200_OK)
