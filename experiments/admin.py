# experiments/admin.py

from django.contrib import admin
from .models import ContactMessage  

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """
    Админ-интерфейс для модели ContactMessage.
    """
    list_display = ('name', 'email', 'sent_at')  # Поля для отображения в списке
    list_filter = ('sent_at',)  # Фильтр по дате отправки
    search_fields = ('name', 'email', 'message')  # Поля для поиска

