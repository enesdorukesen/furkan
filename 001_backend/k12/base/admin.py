from django.contrib import admin

from .models import User, Question, Choices

admin.site.register(User)
admin.site.register(Question)
admin.site.register(Choices)
# Register your models here.
