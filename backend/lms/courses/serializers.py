from rest_framework import serializers
from .models import Course, Enrollment, ScheduleEvent


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'enrolled_at']

class ScheduleEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleEvent
        fields = ['title', 'time', 'host', 'zoom_link']