from django.urls import path
from .views import get_weekly_watchtime

urlpatterns = [
    path('', get_weekly_watchtime, name='watchtime-weekly'),
]
