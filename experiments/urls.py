# experiments/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Главная страница
    path('login/', views.login_register_view, name='login_register'),  # Страница логина
    path('register/', views.register_view, name='register'),  # Страница регистрации
    path('logout/', views.logout_view, name='logout'),  # Выход из системы
    path('contact/', views.contact_view, name='contact'),  # Страница контактов
    path('galaxy-game/', views.galaxy_game_view, name='galaxy_game'),  # Викторина
    path('solar-system/', views.solar_system_view, name='solar_system'),  # Солнечная система
]

