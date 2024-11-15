from django.shortcuts import render

from .models import Room
from .serializer import RoomSerializer, CreateRoomSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.http import JsonResponse

# Create your views here.
class RoomView(APIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get(self, request, format=None):
        rooms = Room.objects.all()
        data = RoomSerializer(rooms, many=True).data
        return Response(data, status=status.HTTP_200_OK)

class GetRoom(APIView):
    serializer_class = RoomSerializer
    # For passing the room code as a parameter in the URL
    # ?code=XXXXXX
    lookup_url_kwarg = 'code'
    
    def get(self, request, format=None):
        print(self.request.session.session_key)
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(self.request.session.session_key)
        code = request.GET.get(self.lookup_url_kwarg)
        
        if code != None:
            room = Room.objects.filter(room_code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                # data is now a python dictionary
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not request.session.exists(self.request.session.session_key):
            request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            room_name = serializer.data.get('room_name')
            guest_control = serializer.data.get('guest_control')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.room_name = room_name
                room.guest_control = guest_control
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['room_name', 'guest_control', 'votes_to_skip'])
                self.request.session['room_code'] = room.room_code
                return Response(RoomSerializer(room).data, status=200)
            else:
                room = Room(host=self.request.session.session_key, room_name = room_name,guest_control=guest_control, votes_to_skip=votes_to_skip)
                room.save()
            return Response(RoomSerializer(room).data, status=201)
        
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(room_code=code)
            if len(room_result) > 0:
                room = room_result[0]
                request.session['room_code'] = code
                print(request.session['room_code'], code)
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserInRoom(APIView):
    def get(self, request, format=None):
        print(request.session.session_key)
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            self.request.session['room_code'] = None
        data = {
            'code': self.request.session['room_code']
        }
        print(self.request.session.get('room_code'))
        return JsonResponse(data, status=status.HTTP_200_OK)
    
class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            code = self.request.session.pop('room_code')
            host = self.request.session.session_key
            room_results = Room.objects.filter(room_code=code)
            if len(room_results) > 0:
                room = room_results[0]
                if host == room.host:
                    room.delete()
                return Response({'Message': 'Successfully closed room'}, status=status.HTTP_200_OK)
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)