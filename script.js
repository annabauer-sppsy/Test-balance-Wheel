const questions = [
  "Я умею концентрироваться на задаче даже при отвлекающих факторах.",
  "Я сохраняю мотивацию, даже когда устаю или не вижу результатов.",
  "Я умею справляться с тревогой перед соревнованиями.",
  "Я уверен в себе в спортивной деятельности.",
  "Я могу быстро восстановиться эмоционально после неудачи.",
  "Я умею планировать тренировочный процесс и соблюдать режим.",
  "Я поддерживаю положительное отношение к тренировкам и соревнованиям.",
  "Я умею справляться с давлением со стороны тренера, семьи или партнёров."
];

let current = 0;
let results = [];

const startButton = document.getElementById("startButton");
const modal = document.getElementById("modal");
const quiz = document.getElementById("quiz");
const questionContainer = document.getElementById("questionContainer");
const nextButton = document.getElementById("nextButton");
const resultBlock = document.getElementById("result");
const chartCanvas = document.getElementById("resultChart");

startButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("hidden");
    quiz.classList.remove("hidden");
    showQuestion();
  }, 1500);
});

nextButton.addEventListener("click", () => {
  const radios = document.querySelectorAll("input[name='answer']");
  let selected = [...radios].find(r => r.checked);
  if (selected) {
    results.push(parseInt(selected.value));
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
});

function showQuestion() {
  questionContainer.innerHTML = `
    <p>${questions[current]}</p>
    <div>
      ${[...Array(10)].map((_, i) =>
        `<label><input type="radio" name="answer" value="${i + 1}"/>${i + 1}</label>`
      ).join(" ")}
    </div>
  `;
}

function showResult() {
  quiz.classList.add("hidden");
  resultBlock.classList.remove("hidden");

  new Chart(chartCanvas, {
    type: "radar",
    data: {
      labels: [
        "Фокус", "Мотивация", "Тревожность", "Уверенность",
        "Восстановление", "Планирование", "Позитив", "Давление"
      ],
      datasets: [{
        label: "Ваш результат",
        data: results,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)"
      }]
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 10
        }
      }
    }
  });
}