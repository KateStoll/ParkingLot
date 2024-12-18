from django.shortcuts import render
from rest_framework import generics
from parking_spaces import serializers
from parking_spaces.models import ParkingSpace
from parking_spaces.serializers import ParkingSpaceSerializer
from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

class ParkingSpaceView(viewsets.ModelViewSet):
    queryset = ParkingSpace.objects.all()
    serializer_class = ParkingSpaceSerializer 
    permission_classes=[IsAuthenticated,]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticatedOrReadOnly()]
        return super().get_permissions()

    
    def post(self, request, id, *args, **kwargs):
        try:
            
            parking_spaces = ParkingSpace.objects.get(id=id)
            parking_space_data = request.data.get('parking_space')
            
            serializer_context = self.get_serializer_context()
            serializer_context['parking_space'] = parking_space
            
            serializer = self.get_serializer(data=parking_space_data, context=serializer_context)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        
            return Response({ "parking_space": serializer.data } ,status=status.HTTP_200_OK)
            
        except Exception:
            return Response({"errors": {
                "body": [
                    "Bad Request"
                ]
            }}, status=status.HTTP_404_NOT_FOUND)
            
        
    
    def list(self, request, id, *args, **kwargs):
        try:
        
            parking_spaces = ParkingSpace.objects.get(id=id)
            
            serializer = self.get_serializer(parking_spaces, many=True)
            
            response = {
                'parking_spaces' : serializer.data, 
            }
            
            return Response(response)
            
        except Exception:
            return Response({"errors": {
                "body": [
                    "Bad Request"
                ]
            }}, status=status.HTTP_404_NOT_FOUND)

