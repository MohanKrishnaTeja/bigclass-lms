from rest_framework import serializers
from .models import WatchTime

class WatchTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchTime
        fields = ['date', 'duration']
