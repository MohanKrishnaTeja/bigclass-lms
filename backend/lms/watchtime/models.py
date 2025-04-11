from django.db import models
from django.conf import settings  # Use settings.AUTH_USER_MODEL for user reference

class WatchTime(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    duration = models.FloatField()  # in hours