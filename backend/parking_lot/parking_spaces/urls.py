from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from parking_spaces import views

parking_space_router = DefaultRouter(trailing_slash=False)
parking_space_router.register("parking-spaces", views.ParkingSpaceView)

urlpatterns = [
    path("v1/", include(parking_space_router.urls)),
    path("auth/", include("djoser.urls.authtoken")),
]

# urlpatterns = [
#    path('parking_spaces/', views.ParkingSpaceList.as_view()),
#    path('parking_spaces/<int:pk>/', views.ParkingSpaceDetail.as_view()),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)
