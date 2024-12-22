// experiments/static/experiments/js/galaxy_game.js

// Модуль викторины
const Quiz = (function() {
    // Данные для викторины
    const questions = [
        {
            question: "Какая планета ближайшая к Солнцу?",
            options: ["Земля", "Меркурий", "Марс", "Венера"],
            correct: 1,
            planetInfo: {
                name: "Меркурий",
                description: "Меркурий — самая близкая к Солнцу планета."
            }
        },
        {
            question: "Какая планета самая большая в Солнечной системе?",
            options: ["Юпитер", "Сатурн", "Нептун", "Уран"],
            correct: 0,
            planetInfo: {
                name: "Юпитер",
                description: "Юпитер — крупнейшая планета Солнечной системы."
            }
        },
        {
            question: "Какая планета известна своими кольцами?",
            options: ["Сатурн", "Нептун", "Марс", "Земля"],
            correct: 0,
            planetInfo: {
                name: "Сатурн",
                description: "Сатурн знаменит своими красивыми кольцами."
            }
        },
        {
            question: "Какая планета красная?",
            options: ["Земля", "Марс", "Юпитер", "Сатурн"],
            correct: 1,
            planetInfo: {
                name: "Марс",
                description: "Марс известен своим красным цветом из-за железистого окисла на его поверхности."
            }
        }
    ];

    let currentQuestionIndex = 0; // Индекс текущего вопроса
    let score = 0; // Счёт пользователя

    // Получение элементов DOM
    const planetNameElem = document.getElementById("planet-name");
    const planetDescriptionElem = document.getElementById("planet-description");
    const questionElem = document.getElementById("question");
    const answerButtonsElem = document.getElementById("answer-buttons");
    const scoreElem = document.getElementById("score");
    const nextButton = document.getElementById("next-button");
    const restartButton = document.getElementById("restart-button");
    const resultModal = document.getElementById("result-modal");
    const finalScoreElem = document.getElementById("final-score");
    const resultTitleElem = document.getElementById("result-title");
    const closeButton = document.querySelector(".close-button");

    // Проверка наличия элементов
    if (!planetNameElem || !planetDescriptionElem || !questionElem || !answerButtonsElem || !scoreElem || !nextButton || !restartButton || !resultModal || !finalScoreElem || !resultTitleElem || !closeButton) {
        console.error("Не удалось найти необходимые элементы DOM.");
        return;
    }

    /**
     * Отображение текущего вопроса и вариантов ответов.
     */
    const showQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        
        // Обновляем информацию о планете
        planetNameElem.textContent = `Планета: ${currentQuestion.planetInfo.name}`;
        planetDescriptionElem.textContent = currentQuestion.planetInfo.description;
        
        // Показываем вопрос
        questionElem.textContent = currentQuestion.question;

        // Генерируем кнопки для ответов
        answerButtonsElem.innerHTML = ''; // Очищаем предыдущие кнопки
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.classList.add("button", "answer-button");
            button.textContent = option;
            button.setAttribute('data-index', index);
            button.addEventListener("click", handleAnswer);
            answerButtonsElem.appendChild(button);
        });

        // Деактивируем кнопку "Следующий вопрос" до выбора ответа
        nextButton.disabled = true;
    };

    /**
     * Обработка выбора ответа пользователем.
     * @param {Event} event - Событие клика на кнопку ответа.
     */
    const handleAnswer = (event) => {
        const selectedIndex = parseInt(event.target.getAttribute('data-index'), 10);
        checkAnswer(selectedIndex);
        provideFeedback(selectedIndex);
        nextButton.disabled = false; // Активируем кнопку "Следующий вопрос"
    };

    /**
     * Проверка выбранного ответа.
     * @param {number} selectedIndex - Индекс выбранного ответа.
     */
    const checkAnswer = (selectedIndex) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedIndex === currentQuestion.correct) {
            score++;
            scoreElem.textContent = score;
        }
        disableAnswerButtons();
    };

    /**
     * Отключение кнопок ответов после выбора.
     */
    const disableAnswerButtons = () => {
        const buttons = answerButtonsElem.querySelectorAll(".answer-button");
        buttons.forEach(button => {
            button.disabled = true;
        });
    };

    /**
     * Предоставление обратной связи пользователю (подсветка правильного/неправильного ответа).
     * @param {number} selectedIndex - Индекс выбранного ответа.
     */
    const provideFeedback = (selectedIndex) => {
        const currentQuestion = questions[currentQuestionIndex];
        const buttons = answerButtonsElem.querySelectorAll(".answer-button");
        buttons.forEach((button, index) => {
            if (index === currentQuestion.correct) {
                button.style.backgroundColor = "#2ecc71"; // Зеленый для правильного
            } else if (index === selectedIndex) {
                button.style.backgroundColor = "#e74c3c"; // Красный для неправильного
            }
            button.style.cursor = "default";
        });
    };

    /**
     * Переход к следующему вопросу.
     */
    const nextQuestionHandler = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    };

    /**
     * Завершение викторины и отображение результата.
     */
    const endQuiz = () => {
        finalScoreElem.textContent = score;
        if (score > 0) {
            resultTitleElem.textContent = "Поздравляем!";
        } else {
            resultTitleElem.textContent = "Попробуйте снова!";
        }
        resultModal.style.display = "block"; // Показываем модальное окно с результатом
    };

    /**
     * Перезапуск викторины.
     */
    const restartGame = () => {
        currentQuestionIndex = 0;
        score = 0;
        scoreElem.textContent = score;
        nextButton.disabled = true;
        showQuestion();
        resultModal.style.display = "none"; // Скрываем модальное окно
    };

    /**
     * Закрытие модального окна.
     */
    const closeModal = () => {
        resultModal.style.display = "none";
    };

    /**
     * Закрытие модального окна при клике вне его.
     */
    const outsideClick = (event) => {
        if (event.target == resultModal) {
            resultModal.style.display = "none";
        }
    };

    /**
     * Инициализация игры: отображение первого вопроса и установка обработчиков событий.
     */
    const init = () => {
        showQuestion();
        nextButton.addEventListener("click", nextQuestionHandler);
        restartButton.addEventListener("click", restartGame);
        closeButton.addEventListener("click", closeModal);
        window.addEventListener("click", outsideClick);
    };

    // Запуск инициализации при загрузке DOM
    document.addEventListener("DOMContentLoaded", init);

    // Возврат публичных методов, если необходимо
    return {
        showQuestion,
        restartGame
    };
})();

