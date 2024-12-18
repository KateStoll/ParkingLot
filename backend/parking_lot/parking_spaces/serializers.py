from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from parking_spaces.models import ParkingSpace

class ParkingSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpace
        fields = ['id', 'taken']
