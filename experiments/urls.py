from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Главная страница
    path('experiments/', views.experiments, name='experiments'),  # Страница всех экспериментов
    path('articles/', views.articles, name='articles'),  # Страница статей
    path('contact/', views.contact, name='contact'),  # Страница контактов
]

