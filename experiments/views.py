from django.shortcuts import render

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

