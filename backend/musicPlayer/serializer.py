from rest_framework import serializers

from musicPlayer.models import Room
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_code', 'room_name', 'host', 'guest_control', 'votes_to_skip', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_name','guest_control', 'votes_to_skip')