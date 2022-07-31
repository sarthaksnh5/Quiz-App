from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
import django.contrib.auth.password_validation as validators
from django.core import exceptions

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'email', 'types', 'is_active', 'avatar']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    types = serializers.CharField(required=True)
    mobile = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    yourClass = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('password',
                  'email', 'first_name', 'last_name', 'types', 'mobile', 'address', 'yourClass')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'types': {'required': True},
            'mobile': {'required': True},
            'address': {'required': True},
            'yourClass': {'required': True},
        }

    def validate(self, attrs):

        password = attrs['password']
        user = User(**attrs)
        errors = dict() 
        try:
            # validate the password and catch the exception
            validators.validate_password(password=password, user=user)
        
        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        
        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            types=validated_data['types'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            mobile=validated_data['mobile'],
            address=validated_data['address'],
            yourClass=validated_data['yourClass']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
