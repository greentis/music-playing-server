from django.db import models

# Create your models here.
class Room(models.Model):
    room_code = models.CharField(max_length=8)
    room_name = models.CharField(max_length=100)
    host = models.CharField(max_length=50)
    guest_control = models.BooleanField(default=False)
    votes_to_skip = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)