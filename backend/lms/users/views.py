import jwt
import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import User  # your custom User model

SECRET_KEY = "bigclass"

@csrf_exempt
def signin(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        if user.password != password:
            return JsonResponse({'error': 'Incorrect password'}, status=401)

        payload = {
            'username': user.username,
            'email': user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return JsonResponse({'token': token}, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
