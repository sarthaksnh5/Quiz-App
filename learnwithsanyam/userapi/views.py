from django.dispatch import receiver
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from django.core.mail import send_mail
from django_rest_passwordreset.signals import reset_password_token_created

User = get_user_model()

# Create your views here.
class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = User.objects.get(email=request.GET['email'])
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.GET['email'])
            user.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def put(self, request, *args, **kwargs):
        try:
            print(request.data)
            user = User.objects.get(email=request.data['email'])
            user.avatar = request.FILES['avatar']
            user.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)

@receiver(reset_password_token_created)
def password_reset_token(sender, instance, reset_password_token, *args, **kwargs):
    message = """
        Here is your reset password token
        Token: {0}
        This is valid for 24 hours only.

        Thank you
        TAP
    """.format(reset_password_token.key)

    send_mail('LWS: Reset Password', message, 'lws@gmail.com', [reset_password_token.user,], fail_silently=False)