import random

from rest_framework import serializers

from .models import User, Question,Choices

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



class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choices
        fields = ['choice_a', 'choice_b', 'choice_c', 'choice_d', 'choice_e', 'answer','question']

class QuestionSerializer(serializers.ModelSerializer):

    choices = ChoiceSerializer(many=True,read_only=True)

    class Meta:
        model = Question
        fields = ['given_id', 'qtype', 'concept', 'level', 'text', 'solution','quiz_or_sample', 'choices']
        extra_kwargs = {
            'given_id': {'read_only': True}
        }
