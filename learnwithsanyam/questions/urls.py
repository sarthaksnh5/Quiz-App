from django.urls import path
from . import views

urlpatterns = [
    path('question', views.QuestionDetailAPI.as_view()),
    path('registerQuestion', views.RegisterQuestionAPIView.as_view()),
    path('quiz', views.QuizDetailAPI.as_view()),
    path('registerQuiz', views.RegisterQuizAPIView.as_view()),
    path('leaderboard', views.LeaderboardDetailAPI.as_view()),
]
