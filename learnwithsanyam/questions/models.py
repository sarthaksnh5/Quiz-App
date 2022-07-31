from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()


class Questions(models.Model):
    question = models.TextField(blank=False, unique=True)
    correct_answer = models.TextField(blank=False)
    incorrect_answer = models.JSONField()
    category = models.CharField(max_length=255, blank=False)
    difficulty = models.CharField(max_length=10, blank=False)
    added_on = models.DateTimeField(auto_now_add=True)


class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=255, blank=False)
    difficulty = models.CharField(max_length=10, blank=False)
    correct_answers = models.CharField(max_length=10, blank=False)
    incorrect_answers = models.CharField(max_length=10, blank=False)
    skip_answers = models.CharField(max_length=10, blank=False)
    points = models.CharField(max_length=10, blank=False)
    on_date = models.DateTimeField(auto_now_add=True)


class LeaderBoard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.CharField(max_length=100, blank=False)
    category = models.CharField(max_length=20)
    difficulty = models.CharField(max_length=255)
    on_date = models.DateTimeField(auto_now_add=True)
