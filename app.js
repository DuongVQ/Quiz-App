const questions = [
    {
        question: "Chiều cao của Dương là bao nhiêu?",
        answer: [
            {text: "A: 1m75", correct: false},
            {text: "B: 1m80", correct: false},
            {text: "B: 1m85", correct: true},
            {text: "D: 1m90", correct: false}
        ]
    },
    {
        question: "Sở thích của Dương là gì?",
        answer: [
            {text: "A: Hát hò", correct: false},
            {text: "B: Xem anime", correct: false},
            {text: "B: Chơi bóng rổ", correct: false},
            {text: "D: Tất cả các đáp án trên", correct: true}
        ]
    },
    {
        question: "Dương có thân thiện, hòa đồng không?",
        answer: [
            {text: "A: Có", correct: true},
            {text: "B: Chắc chắn là có", correct: true},
            {text: "B: Câu này phải hỏi á?", correct: true},
            {text: "D: Cực kì thân thiện", correct: true}
        ]
    },
    {
        question: "Tại sao Dương chưa có người yêu?",
        answer: [
            {text: "A: Quá đẹp trai", correct: false},
            {text: "B: Cao ráo, ga lăng", correct: false},
            {text: "B: Lạnh lùng, chảnh chos", correct: false},
            {text: "D: Chả ai yêu nên ế", correct: true}
        ]
    },
    {
        question: "Bạn có muốn làm chân sai vặt cho Dương không",
        answer: [
            {text: "A: Dạ, có ạ", correct: true},
            {text: "B: Muốn lắm ạ", correct: true},
            {text: "B: Điều mình mong mỏi từ lâu rồi", correct: true},
            {text: "D: Yep, chắc chắn rồi", correct: true}
        ]
    }
];

const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector(".answer-btns");
const preBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".next-btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextBtn.innerHTML = `Next <i class="fa-solid fa-chevron-right"></i>`;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = "Câu hỏi " + questionNo + ": " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerBtn.appendChild(btn);
        if(answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "block";
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach (btn => {
        if(btn.dataset.correct === "true") {
            // btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuesIndex++;
    if(currentQuesIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuesIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();