// experiments/static/experiments/js/solar_system.js

// Модуль для отображения информации о планетах
const SolarSystem = (function() {
    // Данные о планетах
    const planetData = {
        "Меркурий": {
            name: "Меркурий",
            description: "Меркурий — ближайшая к Солнцу планета. У неё нет атмосферы, и поверхность сильно нагревается днем и замерзает ночью."
        },
        "Венера": {
            name: "Венера",
            description: "Венера — планета с самой плотной атмосферой в Солнечной системе, которая состоит в основном из углекислого газа. Поверхность Венеры горячая и покрыта вулканами."
        },
        "Земля": {
            name: "Земля",
            description: "Земля — единственная известная планета, на которой есть жизнь. Она имеет разнообразную атмосферу и воду в жидком состоянии."
        },
        "Марс": {
            name: "Марс",
            description: "Марс — известен как 'красная планета' из-за своей окраски. Исследования показывают, что на Марсе могла существовать вода в прошлом."
        },
        "Юпитер": {
            name: "Юпитер",
            description: "Юпитер — самая большая планета в Солнечной системе. У него есть многочисленные спутники, и он обладает мощным магнитным полем."
        },
        "Сатурн": {
            name: "Сатурн",
            description: "Сатурн известен своими кольцами, которые состоят из льда и камней. Это газовый гигант, и на нем есть много спутников."
        },
        "Уран": {
            name: "Уран",
            description: "Уран — планета, которая вращается на боку. Это ледяной гигант, окружённый системой кольцевых образований."
        },
        "Нептун": {
            name: "Нептун",
            description: "Нептун — планета с сильнейшими ветрами в Солнечной системе. Он обладает красивыми кольцами и имеет несколько спутников."
        }
    };

    // Получение элемента для отображения информации о планете
    const infoBox = document.getElementById('planet-info');

    if (!infoBox) {
        console.error("Элемент с id 'planet-info' не найден.");
        return;
    }

    /**
     * Отображение информации о выбранной планете.
     * @param {string} planet - Название планеты.
     */
    const showInfo = (planet) => {
        const planetInfo = planetData[planet];

        if (planetInfo) {
            infoBox.innerHTML = `
                <h2>${planetInfo.name}</h2>
                <p>${planetInfo.description}</p>
            `;
        } else {
            infoBox.innerHTML = `<p>Кликните на планету, чтобы узнать о ней больше.</p>`;
        }
    };

    /**
     * Инициализация событий для планет.
     */
    const init = () => {
        const planets = document.querySelectorAll('.planet');
        planets.forEach(planet => {
            // Добавление tabindex для доступности
            planet.setAttribute('tabindex', '0');
            // Добавление aria-label для доступности
            planet.setAttribute('aria-label', planet.getAttribute('data-planet'));
            // Добавление обработчика клика
            planet.addEventListener('click', () => {
                showInfo(planet.getAttribute('data-planet'));
            });
            // Добавление обработчика клавиш для доступности
            planet.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showInfo(planet.getAttribute('data-planet'));
                }
            });
        });
    };

    // Запуск инициализации при загрузке DOM
    document.addEventListener('DOMContentLoaded', init);

    // Возврат публичных методов, если необходимо
    return {
        showInfo
    };
})();

