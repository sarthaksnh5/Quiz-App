from dataclasses import field
import random
import string
from rest_framework import serializers
from django.contrib.auth import get_user_model
from forms.models import forumAnswers, forumQuestion
from rest_framework import status
from rest_framework.response import Response

from userapi.serializers import UserSerializer

User = get_user_model()


class SetForumQuestionSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )

    class Meta:
        model = forumQuestion
        fields = ['user', 'question', 'anonymous', 'subject']

    def create(self, validated_data):
        questionCode = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=10))
        question = forumQuestion(user=validated_data['user'], question=validated_data['question'],
                                 anonymous=validated_data['anonymous'], questionCode=questionCode, subject=validated_data['subject'])
        question.save()
        return question


class GetForumQuestionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = forumQuestion
        fields = "__all__"

    def get_user(self, obj):
        user = User.objects.get(email=obj.user)
        serializer = UserSerializer(user)
        return serializer.data


class SetForumAnswerSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )

    questionCode = serializers.SlugRelatedField(
        slug_field='questionCode',
        queryset=forumQuestion.objects.all()
    )

    class Meta:
        model = forumAnswers
        fields = ['questionCode', 'user', 'answer']


class GetForumAnswerSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    questionCode = serializers.SerializerMethodField()

    class Meta:
        model = forumAnswers
        fields = '__all__'

    def get_user(self, obj):
        user = User.objects.get(email=obj.user)
        serializer = UserSerializer(user)
        return serializer.data

    def get_questionCode(self, obj):
        question = forumQuestion.objects.get(questionCode=obj.questionCode.questionCode)
        serializer = GetForumQuestionSerializer(question)
        return serializer.data
