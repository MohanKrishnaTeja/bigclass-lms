# users/authentication.py
import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
import logging

logger = logging.getLogger(__name__)

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        logger.debug(f"JWTAuthentication.authenticate called, headers: {request.headers}")
        
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            logger.warning("No Authorization header found")
            return None
            
        if not auth_header.startswith('Bearer '):
            logger.warning(f"Invalid Authorization format: {auth_header}")
            return None

        token = auth_header.split(' ')[1]
        logger.debug(f"Got token: {token[:10]}...")

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            logger.info(f"Decoded token payload: {payload}")
        except jwt.ExpiredSignatureError:
            logger.error("Token has expired")
            raise AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError as e:
            logger.error(f"Invalid token: {str(e)}")
            raise AuthenticationFailed("Invalid token")
        except Exception as e:
            logger.error(f"Token decoding error: {str(e)}")
            raise AuthenticationFailed("Token decoding error")

        try:
            user = User.objects.get(id=payload['id'])
            logger.info(f"Found user: {user.email}")
            
            # For debugging - verify email matches
            if user.email != payload['email']:
                logger.warning(f"Email mismatch: {user.email} vs {payload['email']}")
                
            return (user, token)
        except User.DoesNotExist:
            logger.error(f"User with id {payload.get('id')} not found")
            raise AuthenticationFailed("User not found")
        except Exception as e:
            logger.error(f"Error retrieving user: {str(e)}")
            raise AuthenticationFailed("Authentication error")
