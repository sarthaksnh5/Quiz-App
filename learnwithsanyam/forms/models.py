from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class forumQuestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.TextField(unique=True)
    on_date = models.DateField(auto_now_add=True)
    anonymous = models.BooleanField(default=True, blank=True)
    questionCode = models.CharField(max_length=200)
    subject = models.CharField(max_length=300)

class forumAnswers(models.Model):
    questionCode = models.ForeignKey(forumQuestion, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.TextField()
    on_date = models.DateTimeField(auto_now_add=True)
