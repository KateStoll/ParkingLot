from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.contrib.auth import login, logout
from rest_framework import generics, permissions, viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from parking_spaces import serializers
from parking_spaces.models import ParkingSpace
from parking_spaces.serializers import ParkingSpaceSerializer

class ParkingSpaceView(viewsets.ModelViewSet):
    queryset = ParkingSpace.objects.all()
    serializer_class = ParkingSpaceSerializer 
    permission_classes=[IsAuthenticated,]
