const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the capital of Spain?",
        options: ["Madrid", "Rome", "Paris", "Berlin"],
        correct: 0
    },
    {
        question: "What is 3 + 5?",
        options: ["5", "7", "8", "10"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const percentageElement = document.getElementById('percentage');
const restartButton = document.getElementById('restart-btn');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
    });
}

function handleOptionClick(event) {
    const selectedOption = event.target;
    const selectedAnswer = parseInt(selectedOption.getAttribute('data-option'));
    const correctAnswer = quizData[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        options[correctAnswer].classList.add('correct');
    }

    options.forEach(option => option.disabled = true);
    nextButton.disabled = false;
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.textContent = `Score: ${score} out of ${quizData.length}`;
    percentageElement.textContent = `Percentage: ${(score / quizData.length * 100).toFixed(2)}%`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultElement.classList.add('hidden');
    loadQuestion();
}

options.forEach(option => {
    option.addEventListener('click', handleOptionClick);
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
    nextButton.disabled = true;
});

restartButton.addEventListener('click', resetQuiz);

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    nextButton.disabled = true;
});
