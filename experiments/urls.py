# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), 
    path('system/', views.solar_system, name='solar_system'),
    path('contact/', views.contact, name='contact'),
    path('game/', views.galaxy_game, name='galaxy_game'),
    path('login/', views.login_register, name='login_register'),
    path('register/', views.register, name='register'),  # Новый маршрут для регистрации
    path('logout/', views.logout_user, name='logout'),  # Новый маршрут для выхода
    path('paint_planet/', views.paint_planet, name='paint_planet'),  # Страница для рисования планеты
    path('save_planet/', views.save_planet, name='save_planet'),  # Маршрут для сохранения планеты
    path('download_planet/<str:file_name>/', views.download_planet, name='download_planet'),  # Маршрут для скачивания
]

