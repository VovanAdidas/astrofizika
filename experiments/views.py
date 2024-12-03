from django.shortcuts import render

def index(request):
    return render(request, 'experiments/index.html')

def experiments(request):
    return render(request, 'experiments/experiments.html')  # Отображение слайда с экспериментами

def articles(request):
    return render(request, 'experiments/articles.html')

def contact(request):
    return render(request, 'experiments/contact.html')

