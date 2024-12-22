// experiments/static/experiments/js/index.js

// Функция для обработки кликов на кнопки навигации
document.addEventListener('DOMContentLoaded', function () {
    // Получение кнопок по их ID
    const systemButton = document.getElementById('system-button');
    const gameButton = document.getElementById('game-button');

    /**
     * Переход к разделу солнечной системы.
     */
    const goToSystem = () => {
        window.location.href = '/solar-system/'; // Переход к маршруту 'solar_system'
    };

    /**
     * Переход к разделу викторины.
     */
    const goToGame = () => {
        window.location.href = '/galaxy-game/'; // Переход к маршруту 'galaxy_game'
    };

    // Установка обработчиков событий для кнопок
    if (systemButton) {
        systemButton.addEventListener('click', goToSystem);
    }

    if (gameButton) {
        gameButton.addEventListener('click', goToGame);
    }

    /**
     * Переход к странице контактов при прокрутке вниз.
     */
    window.addEventListener('scroll', function() {
        // Определяем высоту главной секции
        const homeSection = document.getElementById('home');
        const contactSection = document.getElementById('contact');

        if (homeSection && contactSection) {
            const homeHeight = homeSection.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight;

            // Если пользователь прокрутил больше половины главной секции, переходим к контактам
            if (scrollPosition > homeHeight / 2) {
                window.location.href = '/contact/'; // Переход на страницу контактов
            }
        }
    });
});

