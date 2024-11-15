from django.db import models
import random
import string

def generateRoomCode():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(room_code=code).count() == 0: break
    return code

# Create your models here.
class Room(models.Model):
    room_code = models.CharField(max_length=8, default=generateRoomCode, unique=True)
    room_name = models.CharField(max_length=100)
    host = models.CharField(max_length=50)
    guest_control = models.BooleanField(default=False)
    votes_to_skip = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)