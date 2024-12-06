from django.urls import path
from . import views

# Список маршрутов для приложения
urlpatterns = [
    # Главная страница
    path('', views.index, name='index'), 

    # Путь к странице с солнечной системой
    path('system/', views.solar_system, name='solar_system'),

    # Путь к странице с контактной информацией
    path('contact/', views.contact, name='contact'),

    # Путь к странице с викториной
    path('game/', views.galaxy_game, name='galaxy_game'),
]

