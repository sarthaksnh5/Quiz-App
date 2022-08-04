from django.urls import path
from . import views

urlpatterns = [
    path('question/get', views.GetForumQuestionAPI.as_view()),
    path('question/set', views.SetForumQuestionAPI.as_view()),
    path('answer/get', views.GetForumAnswerAPI.as_view()),
    path('answer/set', views.SetForumAnswerAPI.as_view()),
]