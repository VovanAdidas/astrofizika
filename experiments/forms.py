# experiments/forms.py

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    """
    Форма для входа пользователей.
    """
    username = forms.CharField(max_length=150, required=True, label="Имя пользователя")
    password = forms.CharField(widget=forms.PasswordInput, required=True, label="Пароль")

class RegisterForm(UserCreationForm):
    """
    Форма для регистрации новых пользователей.
    """
    email = forms.EmailField(max_length=254, required=True, help_text="Введите действующий адрес электронной почты.")

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

