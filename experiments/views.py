# experiments/views.py

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import LoginForm, RegisterForm
from .models import ContactMessage
from django.core.mail import send_mail
from django.conf import settings

def index(request):
    """
    Представление для главной страницы.
    """
    return render(request, 'experiments/index.html')

def login_register_view(request):
    """
    Представление для авторизации пользователей.
    """
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            # Извлечение данных из формы
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            # Аутентификация пользователя
            user = authenticate(request, username=username, password=password)
            if user is not None:
                # Вход пользователя
                login(request, user)
                messages.success(request, "Вы успешно вошли в систему.")
                return redirect('index')
            else:
                messages.error(request, "Неверное имя пользователя или пароль.")
    else:
        form = LoginForm()
    return render(request, 'experiments/login_register.html', {'form': form})

def register_view(request):
    """
    Представление для регистрации новых пользователей.
    """
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            # Сохранение нового пользователя
            user = form.save()
            # Вход нового пользователя после регистрации
            login(request, user)
            messages.success(request, "Вы успешно зарегистрировались и вошли в систему.")
            return redirect('index')
        else:
            messages.error(request, "Пожалуйста, исправьте ошибки ниже.")
    else:
        form = RegisterForm()
    return render(request, 'experiments/register.html', {'form': form})

def logout_view(request):
    """
    Представление для выхода из системы.
    """
    if request.method == 'POST':
        logout(request)
        messages.success(request, "Вы успешно вышли из системы.")
    return redirect('index')

def contact_view(request):
    """
    Представление для страницы контактов.
    """
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        # Отправка сообщения по email
        subject = f'Сообщение от {name}'
        full_message = f'От: {name} <{email}>\n\n{message}'
        send_mail(
            subject,
            full_message,
            'your_email@example.com',  # Отправитель, замените на реальный email
            ['recipient@example.com'],  # Получатель, замените на реальный email
            fail_silently=False,
        )
        
        # Сохранение сообщения в базе данных
        ContactMessage.objects.create(
            name=name,
            email=email,
            message=message
        )
        
        messages.success(request, "Ваше сообщение успешно отправлено.")
        return redirect('contact')
    return render(request, 'experiments/contact.html')
    
def galaxy_game_view(request):
    """
    Представление для страницы викторины.
    """
    return render(request, 'experiments/galaxy_game.html')

def solar_system_view(request):
    """
    Представление для страницы солнечной системы.
    """
    return render(request, 'experiments/solar_system.html')

