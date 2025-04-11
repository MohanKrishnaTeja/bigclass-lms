from django.contrib import admin
from .models import Course, Enrollment, ScheduleEvent

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'number_of_days')
    search_fields = ('title',)
    list_filter = ('number_of_days',)


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'course', 'enrolled_at')
    search_fields = ('user__username', 'course__title')
    list_filter = ('enrolled_at',)

@admin.register(ScheduleEvent)
class ScheduleEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'host')
    list_filter = ('date',)
    search_fields = ('title', 'host')