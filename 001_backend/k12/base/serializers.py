import random

from rest_framework import serializers

from .models import User, Question

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'mobile', 'first_name', 'last_name','password', 'status']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.username = random.randrange(100001,999999)
        instance.save()
        return instance

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ['name', 'qtype', 'concept', 'level', 'text', 'solution','choices']
        extra_kwargs = {
            'name': {'read_only': True}
        }

