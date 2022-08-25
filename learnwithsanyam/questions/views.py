import random
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from questions.models import LeaderBoard, Questions, Quiz
from questions.serializers import GetLeaderboardSerializer, GetQuestionSerializer, GetQuizSerializer, RegisterQuestionSerializer, RegisterQuizSerializer

User = get_user_model()


class QuestionDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        try:
            if 'filter' in request.GET:
                filter = request.GET['filter']
                if filter == 'special':
                    questions = Questions.objects.filter(difficulty='special')
                    endNum = len(questions) - 10
                    ranI = random.randint(0, endNum)
                    questions = questions[ranI:ranI + 10]

            else:
                category = request.GET['category']
                difficulty = request.GET['difficulty']
                questions = Questions.objects.filter(
                    category=category, difficulty=difficulty)
                endNum = len(questions) - 10
                ranI = random.randint(0, endNum)
                questions = questions[ranI:ranI + 10]

            serializer = GetQuestionSerializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            #id = request.GET['id']
            # question = Questions.objects.get(id=id)
            # question.delete()
            questions = Questions.objects.filter(category='Social')
            for question in questions:
                question.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class RegisterQuestionAPIView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = RegisterQuestionSerializer


class QuizDetailAPI(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        try:
            if request.GET['filter'] == 'user':
                try:
                    user = User.objects.get(email=request.GET['email'])
                    quizzes = Quiz.objects.filter(
                        user=user).order_by('-on_date')
                    if len(quizzes) > 0:
                        serializer = GetQuizSerializer(quizzes[0])
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    else:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    print(e)
                    return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)

            if request.GET['filter'] == 'quiz':
                quiz = Quiz.objects.get(id=request.GET['id'])
                serializer = GetQuizSerializer(quiz)
                return Response(serializer.data, status=status.HTTP_200_OK)

            if request.GET['filter'] == 'quizes':
                user = User.objects.get(email=request.GET['email'])
                quizzes = Quiz.objects.filter(user=user).order_by('-on_date')
                serializer = GetQuizSerializer(quizzes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            if request.GET['filter'] == 'rank':
                user = User.objects.get(email=request.GET['email'])
                leader = LeaderBoard.objects.get(user=user, category='Science', difficulty='Easy')
                rank = LeaderBoard.objects.filter(
                    points__gt=leader.points).count() + 1
                temp = {
                    'rank': rank,
                    'points': leader.points
                }
                return Response(temp, status.HTTP_200_OK)

        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class RegisterQuizAPIView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = RegisterQuizSerializer


class LeaderboardDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        try:
            category = request.GET['category']
            difficulty = request.GET['difficulty']
            leaderboard = LeaderBoard.objects.filter(
                category=category, difficulty=difficulty).order_by('-points')
            serializer = GetLeaderboardSerializer(leaderboard, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
