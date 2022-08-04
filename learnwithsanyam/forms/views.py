from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from forms.models import forumAnswers, forumQuestion
from rest_framework.response import Response 
from forms.serializers import GetForumAnswerSerializer, GetForumQuestionSerializer, SetForumAnswerSerializer, SetForumQuestionSerializer


# Create your views here.
class SetForumQuestionAPI(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = SetForumQuestionSerializer

class GetForumQuestionAPI(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    
    def get(self, request, *args, **kwargs):
        questions = forumQuestion.objects.all().order_by('on_date')
        serializer = GetForumQuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SetForumAnswerAPI(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = SetForumAnswerSerializer

class GetForumAnswerAPI(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        try:
            question = forumQuestion.objects.get(questionCode=request.GET['code'])
            answers = forumAnswers.objects.filter(questionCode=question)
            
            serializer = GetForumAnswerSerializer(answers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)