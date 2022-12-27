from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import JSONField

class User(AbstractUser):

    Status = (
        ('ST', 'Student'),
        ('TA','Teaching Assistant'),
        ('IN', 'Instructor'),
        ('MT', 'Mentor'),
        ('AD', 'Admin'),
    )
    username = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    mobile = models.CharField(max_length=100, blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=2, choices=Status, default="Student" )
    
    REQUIRED_FIELDS = []


class Choices(models.Model):
    a = models.TextField(max_length=500)
    b = models.TextField(max_length=500)
    c = models.TextField(max_length=500)
    d = models.TextField(max_length=500)
    e = models.TextField(max_length=500)
    answer = models.CharField(max_length=1)

class Question(models.Model):

    name = models.AutoField(primary_key=True)
    qtype = models.CharField(max_length=2)
    concept=models.CharField(max_length=100)
    level=models.CharField(max_length=2)
    text=models.TextField(max_length=500)
    choices = models.JSONField(default=Choices)
    solution=models.TextField(max_length=500)
