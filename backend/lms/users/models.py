from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)  # Note: Django recommends using the built-in User model for security
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, default='student')

    def __str__(self):
        return self.username
