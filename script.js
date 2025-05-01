let userName = "";
function startQuiz() {
  const input = document.getElementById("username");
  if (input.value.trim() === "") {
    alert("Please enter your name first.");
    return;
  }
  userName = input.value.trim();
  document.getElementById("login").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  quizData = shuffle(quizData);
  current = 0;
  score = 0;
  showQuestion();
}

function goToHome() {
  location.reload();
}

const quizBase = [
  { hiragana: "あ", romanji: "a", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Ame-rain.jpg", audio: "https://assets.codepen.io/6093409/a.mp3" },
  { hiragana: "い", romanji: "i", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Shiba_inu.jpg", audio: "https://assets.codepen.io/6093409/i.mp3" },
  { hiragana: "う", romanji: "u", image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Umi-beach.jpg", audio: "https://assets.codepen.io/6093409/u.mp3" },
  { hiragana: "え", romanji: "e", image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Eki-station.jpg", audio: "https://assets.codepen.io/6093409/e.mp3" },
  { hiragana: "お", romanji: "o", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ocha-tea.jpg", audio: "https://assets.codepen.io/6093409/o.mp3" },
  { hiragana: "か", romanji: "ka", image: "", audio: "" },
  { hiragana: "き", romanji: "ki", image: "", audio: "" },
  { hiragana: "く", romanji: "ku", image: "", audio: "" },
  { hiragana: "け", romanji: "ke", image: "", audio: "" },
  { hiragana: "こ", romanji: "ko", image: "", audio: "" },
  { hiragana: "さ", romanji: "sa", image: "", audio: "" },
  { hiragana: "し", romanji: "shi", image: "", audio: "" },
  { hiragana: "す", romanji: "su", image: "", audio: "" },
  { hiragana: "せ", romanji: "se", image: "", audio: "" },
  { hiragana: "そ", romanji: "so", image: "", audio: "" },
  { hiragana: "た", romanji: "ta", image: "", audio: "" },
  { hiragana: "ち", romanji: "chi", image: "", audio: "" },
  { hiragana: "つ", romanji: "tsu", image: "", audio: "" },
  { hiragana: "て", romanji: "te", image: "", audio: "" },
  { hiragana: "と", romanji: "to", image: "", audio: "" },
];

const quotesPositive = [
  "Success is the sum of small efforts repeated every day.",
  "Keep going, you're doing great!",
  "Practice makes perfect — you're on your way!",
  "You’ve got this! Learning a language is a journey."
];

const quotesEncouraging = [
  "Don’t be discouraged — even mistakes help you grow!",
  "Failure is the opportunity to begin again more wisely.",
  "Mistakes are proof you are trying.",
  "Every expert was once a beginner."
];

let quizData = [];
quizBase.forEach(q => {
  quizData.push({ question: `What is the reading of 「${q.hiragana}」?`, correct: q.romanji, image: q.image, audio: q.audio });
  quizData.push({ question: `Which Hiragana represents '${q.romanji}'?`, correct: q.hiragana, image: q.image, audio: q.audio });
});

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

let current = 0;
let score = 0;

function playSound(id) {
  const audio = document.getElementById(id);
  audio.currentTime = 0;
  audio.play();
}

function showQuestion() {
  const q = quizData[current];
  document.getElementById("question").innerText = q.question;
  
  

  const options = quizBase.map(x => q.correct.length > 1 ? x.romanji : x.hiragana);
  const shuffled = [...new Set([q.correct, ...shuffle(options).slice(0, 3)])].sort(() => Math.random() - 0.5);
  const choiceContainer = document.getElementById("choices");
  choiceContainer.innerHTML = "";
  shuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(choice, q.correct);
    choiceContainer.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  playSound("clickSound");
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    score++;
    feedback.innerText = "✅ Correct!";
    playSound("correctSound");
  } else {
    feedback.innerText = `❌ Wrong! The correct answer is: ${correct}`;
    playSound("wrongSound");
  }
  current++;
  updateProgress();
  setTimeout(() => {
    if (current < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function updateProgress() {
  const percent = (current / quizData.length) * 100;
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("score").innerText = `Score: ${score}/${quizData.length}`;
}

function showResult() {
  const feedbackQuote = score >= quizData.length * 0.7
    ? shuffle(quotesPositive)[0]
    : shuffle(quotesEncouraging)[0];
  document.getElementById("question").innerText = `🎉 Quiz Completed!`; 
  document.getElementById("choices").innerHTML = "";
  document.getElementById("feedback").innerText = `Final Score: ${score}/${quizData.length}`;
  document.getElementById("quote").innerText = `\"${feedbackQuote}\"\nThank you, ${userName}!`; 
  document.getElementById("end-buttons").style.display = "block";
}

function restartQuiz() {
  quizData = shuffle(quizData);
  current = 0;
  score = 0;
  document.getElementById("end-buttons").style.display = "none";
  document.getElementById("feedback").innerText = "";
  document.getElementById("score").innerText = "";
  document.getElementById("progress-bar").style.width = "0%";
  showQuestion();
}