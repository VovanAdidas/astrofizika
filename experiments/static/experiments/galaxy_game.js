// Данные для викторины (вопросы, варианты ответов и информация о планетах)
const questions = [
    {
        question: "Какая планета ближайшая к Солнцу?", // Вопрос
        options: ["Земля", "Меркурий", "Марс", "Венера"], // Варианты ответов
        correct: 1, // Индекс правильного ответа
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

// Индекс текущего вопроса и счет игры
let currentQuestionIndex = 0;
let score = 0;

// Функция для отображения вопроса и вариантов ответа
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Обновляем информацию о планете
    document.getElementById("planet-name").textContent = "Планета: " + currentQuestion.planetInfo.name;
    document.getElementById("planet-description").textContent = currentQuestion.planetInfo.description;
    
    // Показываем вопрос
    document.getElementById("question").textContent = currentQuestion.question;

    // Генерируем кнопки для ответов
    const answerButtons = document.getElementById("answer-buttons");
    answerButtons.innerHTML = ''; // Очищаем предыдущие кнопки
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.textContent = option;
        button.onclick = function() {
            checkAnswer(index); // Проверяем ответ при клике на кнопку
        };
        answerButtons.appendChild(button);
    });
}

// Функция для проверки ответа
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        score++; // Увеличиваем счет, если ответ правильный
        document.getElementById("score").textContent = score;  // Обновляем счет
    }

    // Делаем кнопки неактивными после выбора
    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Функция для перехода к следующему вопросу
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Переходим к следующему вопросу
    } else {
        alert("Вы прошли все вопросы! Ваш счет: " + score); // Завершаем игру, если вопросы закончились
        document.getElementById("next-button").disabled = true;
    }
}

// Функция для перезапуска игры
function restartGame() {
    currentQuestionIndex = 0; // Сбрасываем индекс вопроса
    score = 0; // Сбрасываем счет
    document.getElementById("score").textContent = score; // Обновляем счет
    document.getElementById("next-button").disabled = false; // Включаем кнопку для следующего вопроса
    showQuestion(); // Показываем первый вопрос
}

// Слушатели событий для кнопок
document.getElementById("next-button").addEventListener("click", nextQuestion);
document.getElementById("restart-button").addEventListener("click", restartGame);

// Инициализация игры
showQuestion();

