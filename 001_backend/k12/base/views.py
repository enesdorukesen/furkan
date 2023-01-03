import jwt, datetime
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied

from .serializers import UserSerializer, QuestionSerializer, ChoiceSerializer
from .models import User, Question, Choices

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = serializer.data
        return Response(
            {'username':response['username'],
            'email':response['email'],
            'message':'success'})


class LoginView(APIView):
    def post(self, request):
        username= request.data['username']
        password= request.data['password']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes = 60),
            'iat':datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secretsecret', algorithm='HS256')

        response = Response()
        # response.set_cookie(key='accessToken', value=token, httponly=True)
        response.data = {'accessToken':token}

        return response

class UserView(APIView):
    def get(self, request):
        headerData = request.headers['Authorization']
        token = headerData.replace("Bearer","").strip()
        # token = request.COOKIES.get('accessToken')

        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secretsecret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        serializer = UserSerializer(user)
        return Response(serializer.data)

class UpdateUserView(APIView):
    def post(self, request):
        headerData = request.headers['Authorization']
        token = headerData.replace("Bearer","").strip()
        # token = request.COOKIES.get('accessToken')

        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secretsecret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.mobile = request.data['mobile']
        user.save()

        response = {
            'message':'Success'
        }
        return Response(response)


class LogoutView(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('accessToken')
        response.data = {
            'message':'success'
        }
        return response


class QuestionView(APIView):
    def get(self, request):
        questions = Question.objects.all()
        response = QuestionSerializer(questions, many=True)
        return Response(response.data)




class AddQuestionView(APIView):
    def post(self, request):
        headerData = request.headers['Authorization']
        token = headerData.replace("Bearer","").strip()
        # token = request.COOKIES.get('accessToken')

        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secretsecret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        if (user.status != "TA" and user.status != 'IN' and user.status != 'AD'):
            raise PermissionDenied ({'detail':'Unauthorized User'})

        data = request.data
        question = QuestionSerializer(data=data)
        question.is_valid(raise_exception=True)
        question.save()
        data['choices']["question"] = question.data["given_id"]
        choices = ChoiceSerializer(data = data['choices'])
        choices.is_valid(raise_exception=True)
        choices.save()
        return Response (question.data)
