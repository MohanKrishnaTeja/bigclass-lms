from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils.timezone import now, timedelta
from .models import WatchTime
from .serializers import WatchTimeSerializer
from users.authentication import JWTAuthentication
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_weekly_watchtime(request):
    # Debug information
    logger.info(f"Headers: {request.headers}")
    logger.info(f"User: {request.user}")
    logger.info(f"Auth: {request.auth}")
    
    user = request.user
    if not user.is_authenticated:
        logger.warning("User is not authenticated")
        return Response({"error": "User is not authenticated"}, status=403)

    # Create some sample data if none exists (for testing)
    create_sample_data = False  # Set to True to create sample data for testing
    if create_sample_data:
        today = now().date()
        for i in range(7):
            date = today - timedelta(days=i)
            WatchTime.objects.get_or_create(
                user=user,
                date=date,
                defaults={
                    'duration': float(i+1),
                }
            )
    
    start_date = now().date() - timedelta(days=6)
    end_date = now().date()
    watch_data = WatchTime.objects.filter(user=user, date__range=[start_date, end_date])
    
    # Group by day of week
    daily_watch = {day: 0 for day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
    for wt in watch_data:
        weekday = wt.date.strftime("%a")  # 'Sun', 'Mon', etc.
        daily_watch[weekday] += wt.duration

    # Output in sorted order
    ordered_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    response = [{'day': d, 'hours': round(daily_watch[d], 2)} for d in ordered_days]

    return Response(response)
