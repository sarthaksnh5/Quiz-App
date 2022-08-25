from rest_framework import serializers
from django.contrib.auth import get_user_model
from questions.models import LeaderBoard, Questions, Quiz
from rest_framework import status     
from rest_framework.response import Response

from userapi.serializers import UserSerializer 

User = get_user_model()


class GetQuestionSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Questions
        fields = ['id', 'question', 'correct_answer',
                  'incorrect_answer', 'category', 'difficulty']



class RegisterQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ('question', 'correct_answer',
                  'incorrect_answer', 'category', 'difficulty')


class GetQuizSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['id', 'user', 'category', 'difficulty', 'correct_answers',
                  'incorrect_answers', 'skip_answers', 'points', 'on_date']

    def get_user(self, obj):    
        user = User.objects.get(email=obj.user)
        serializer = UserSerializer(user)
        return serializer.data


class RegisterQuizSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )

    class Meta:
        model = Quiz
        fields = ('user', 'category', 'difficulty', 'correct_answers',
                  'incorrect_answers', 'skip_answers', 'points')        

    def create(self, validated_data):        
        try:
            category = validated_data['category']
            user = validated_data['user']
            difficulty = validated_data['difficulty']
            correct_answers = validated_data['correct_answers']
            incorrect_answers = validated_data['incorrect_answers']
            skip_answers = validated_data['skip_answers']
            points = validated_data['points']
            
            quiz = Quiz(category=category, user=user, difficulty=difficulty, correct_answers=correct_answers, incorrect_answers=incorrect_answers, skip_answers=skip_answers, points=points)
            quiz.save()
            try:
                leader = LeaderBoard.objects.get(user=user, category=category, difficulty=difficulty)
                leader.points = int(points) + int(leader.points)
                leader.save()
            except Exception as e:
                leader = LeaderBoard(user=user, points=points, category=category, difficulty=difficulty)
                leader.save()
            return quiz
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetLeaderboardSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = LeaderBoard
        fields = ['id', 'user', 'points', 'category', 'on_date']

    def get_user(self, obj):    
        user = User.objects.get(email=obj.user)
        serializer = UserSerializer(user)
        return serializer.data
