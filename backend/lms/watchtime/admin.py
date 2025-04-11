# admin.py
from django.contrib import admin
from .models import WatchTime

@admin.register(WatchTime)
class WatchTimeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'duration']  # Changed 'hours' to 'duration'
    list_filter = ("user", "date")
    search_fields = ("user__username",)
