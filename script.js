const questions = [
  {
    thought: "I feel like I do not belong here.",
    answers: [
      "It is normal to feel out of place in a new environment, and belonging can take time.",
      "That means I should stop trying and keep to myself."
    ],
    correctIndex: 0,
    feedback:
      "Yes... and maybe this feeling is part of adjusting, not proof that you will never belong."
  },
  {
    thought: "My accent makes me sound less capable.",
    answers: [
      "My accent shows that I have lived, learned, and speak more than one language.",
      "People will always think I am not smart."
    ],
    correctIndex: 0,
    feedback:
      "Gentle shift. An accent is not a weakness. It often carries courage, effort, and experience."
  },
  {
    thought: "Everyone else understands how life works here except me.",
    answers: [
      "I am learning at my own pace, and many people feel confused when starting somewhere new.",
      "I am behind everyone and there is no point asking for help."
    ],
    correctIndex: 0,
    feedback:
      "That is a kinder thought. Learning takes time, and needing time does not mean failure."
  },
  {
    thought: "Because I feel lonely today, things will always stay like this.",
    answers: [
      "Lonely is a feeling, not a permanent future.",
      "Yes, this proves nothing will improve."
    ],
    correctIndex: 0,
    feedback: "Good catch. Feelings can be intense and still temporary."
  },
  {
    thought: "I made one mistake, so I ruined everything.",
    answers: [
      "One mistake does not define me. I can repair, learn, and keep going.",
      "I always mess things up."
    ],
    correctIndex: 0,
    feedback:
      "That is courage. A mistake can be part of growth, not the end of the story."
  }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreText = document.getElementById("score");
const penguin = document.getElementById("penguin");
const penguinMood = document.getElementById("penguinMood");
const progressFill = document.getElementById("progressFill");
const levelText = document.getElementById("levelText");

function loadQuestion() {
  const q = questions[currentQuestion];

  questionText.textContent = q.thought;
  answersContainer.innerHTML = "";
  feedback.classList.add("hidden");
  feedback.textContent = "";
  nextBtn.classList.add("hidden");

  penguin.classList.remove("happy", "sad");
  penguinMood.textContent = "Take a breath. Pick the gentler thought.";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    answersContainer.appendChild(btn);
  });

  updateProgress();
}

function selectAnswer(selectedIndex, selectedButton) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, index) => {
    btn.disabled = true;

    if (index === q.correctIndex) {
      btn.classList.add("correct");
    }

    if (index === selectedIndex && index !== q.correctIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === q.correctIndex) {
    score++;
    scoreText.textContent = score;
    penguin.classList.add("happy");
    penguinMood.textContent = "You helped the penguin feel braver 🐟";
  } else {
    penguin.classList.add("sad");
    penguinMood.textContent = "That is okay. We can try again gently.";
  }

  feedback.textContent = q.feedback;
  feedback.classList.remove("hidden");

  if (currentQuestion < questions.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    restartBtn.classList.remove("hidden");
    penguinMood.textContent =
      score >= Math.ceil(questions.length * 0.6)
        ? "You finished with courage. The penguin is proud of you."
        : "You made it through. Gentle practice still counts.";
  }
}

function updateProgress() {
  const progress = (currentQuestion / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  levelText.textContent = `Level ${currentQuestion + 1}`;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreText.textContent = score;
  restartBtn.classList.add("hidden");
  loadQuestion();
});

loadQuestion();