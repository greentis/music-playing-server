from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import RoomView, GetRoom

urlpatterns = [
    path('room', RoomView.as_view, name='room'),
    path('create-room', RoomView.as_view, name='create-room'),
    path('get-room', GetRoom.as_view, name='get-room'),
]
