from django.shortcuts import render

from .models import Room
from .serializer import RoomSerializer, CreateRoomSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

# Create your views here.
class RoomView(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(ModelViewSet):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=200)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=404)

class CreateRoomView(ModelViewSet):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_control = serializer.data.get('guest_control')
            votes_to_skip = serializer.data.get('votes_to_skip')
            room = Room(host=self.request.session.session_key, guest_control=guest_control, votes_to_skip=votes_to_skip)
            room.save()
            return Response(RoomSerializer(room).data, status=201)