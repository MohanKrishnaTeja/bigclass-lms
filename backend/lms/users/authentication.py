# users/authentication.py
import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from users.models import User

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")

        try:
            user = User.objects.get(id=payload['id'], email=payload['email'])
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")

        # You can't modify user.id or user.username directly, but you can attach extra attributes
        user.jwt_data = {
            "id": payload["id"],
            "username": payload["username"],
            "email": payload["email"]
        }

        return (user, None)
