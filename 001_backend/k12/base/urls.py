from django.urls import path, include

from .views import RegisterView, LoginView, UserView, LogoutView, UpdateUserView,QuestionView,AddQuestionView


urlpatterns = [
    path('register', RegisterView.as_view(), name="register"),
    path('login', LoginView.as_view(), name="login"),
    path('user', UserView.as_view(), name="user"),
    path('logout', LogoutView.as_view(), name="logout"),
    path('user/update', UpdateUserView.as_view(), name="update user"),
    path('question', QuestionView.as_view(), name="get all questions"),
    path('question/add', AddQuestionView.as_view(), name="update user"),

]
