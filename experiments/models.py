# experiments/models.py

from django.db import models

class ContactMessage(models.Model):
    """
    Модель для хранения сообщений, отправленных через форму контактов.
    """
    name = models.CharField(max_length=100, help_text="Введите ваше имя.")
    email = models.EmailField(help_text="Введите ваш адрес электронной почты.")
    message = models.TextField(help_text="Введите ваше сообщение.")
    sent_at = models.DateTimeField(auto_now_add=True, help_text="Время отправки сообщения.")

    def __str__(self):
        return f'Сообщение от {self.name} ({self.email})'

