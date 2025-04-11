from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer
from django.shortcuts import get_object_or_404
from datetime import date
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import ScheduleEvent  # Make sure ScheduleEvent exists
from .serializers import ScheduleEventSerializer  # Make sure this is defined


from users.authentication import JWTAuthentication  # 👈 Import your custom JWT auth

class EnrollCourseView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        enrollment, created = Enrollment.objects.get_or_create(user=request.user, course=course)
        if not created:
            return Response({"message": "Already enrolled"}, status=status.HTTP_200_OK)
        return Response({"message": "Enrolled successfully"}, status=status.HTTP_201_CREATED)


class UserCoursesView(APIView):  # 🟢 This is your "my-courses" endpoint
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(user=request.user)
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)


class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class TodayScheduleView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        today = date.today()
        events = ScheduleEvent.objects.filter(date=today).order_by('time')
        serializer = ScheduleEventSerializer(events, many=True)
        return Response(serializer.data)
