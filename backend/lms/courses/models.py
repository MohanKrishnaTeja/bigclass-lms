# users/models.py or courses/models.py
from django.db import models
from django.conf import settings

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    number_of_days = models.IntegerField()

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

class ScheduleEvent(models.Model):
    title = models.CharField(max_length=200)
    time = models.TimeField()
    date = models.DateField()
    host = models.CharField(max_length=100)
    zoom_link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.date} {self.time}"