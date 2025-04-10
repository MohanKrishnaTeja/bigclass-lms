from django.urls import path
from . import views

urlpatterns = [
    path('', views.CourseListView.as_view(), name='course-list'),
    path('enroll/<int:course_id>/', views.EnrollCourseView.as_view(), name='enroll-course'),
    path('my-courses/', views.UserCoursesView.as_view(), name='my-courses'),  # 🔧 fixed this line
]
