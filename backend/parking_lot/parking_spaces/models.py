from django.db import models

class ParkingSpace(models.Model):
    id = models.AutoField(primary_key=True)
    taken = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
