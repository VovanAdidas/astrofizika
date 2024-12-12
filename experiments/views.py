from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from PIL import Image
from io import BytesIO
import base64
from django.http import JsonResponse, HttpResponse
import os

# Главная страница
def index(request):
    return render(request, 'experiments/index.html')

# Страница с солнечной системой
def solar_system(request):
    return render(request, 'experiments/solar_system.html') 

# Страница с викториной "Galaxy Game"
def galaxy_game(request):
    return render(request, 'experiments/galaxy_game.html')

# Страница с контактной информацией
def contact(request):
    return render(request, 'experiments/contact.html')

# Страница авторизации
def login_register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, "Неверные имя пользователя или пароль")
    return render(request, 'experiments/login_register.html')

def register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        # Проверка, что имя пользователя и пароли не пустые
        if not username:
            messages.error(request, "Имя пользователя обязательно")
        elif password1 != password2:
            messages.error(request, "Пароли не совпадают")
        elif User.objects.filter(username=username).exists():
            messages.error(request, "Имя пользователя уже занято")
        else:
            # Создание пользователя без email
            user = User.objects.create_user(username=username, password=password1)
            user.save()
            messages.success(request, "Регистрация прошла успешно")
            return redirect('login_register')
    return render(request, 'experiments/register.html')

# Выход из системы
def logout_user(request):
    logout(request)
    return redirect('index')

# Страница рисования планеты (доступна только для авторизованных пользователей)
@login_required
def paint_planet(request):
    return render(request, 'experiments/paint_planet.html')

# Сохранение изображения планеты (доступно только для авторизованных пользователей)
@login_required
def save_planet(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        image_data = data.split('data:image/png;base64,')[1]  # Извлекаем данные изображения
        image = Image.open(BytesIO(base64.b64decode(image_data)))
        
        # Сохраняем изображение на сервере
        file_name = f"{request.user.username}_planet.png"
        file_path = os.path.join('planets', file_name)  # Путь сохранения изображения
        image.save(file_path)

        return JsonResponse({'message': 'Image saved successfully', 'image_path': file_path})

# Скачивание изображения планеты (доступно только для авторизованных пользователей)
@login_required
def download_planet(request, file_name):
    # Путь к файлу на сервере
    file_path = os.path.join('planets', file_name)
    
    try:
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='image/png')
            response['Content-Disposition'] = f'attachment; filename={file_name}'
            return response
    except FileNotFoundError:
        return JsonResponse({'error': 'File not found'}, status=404)

