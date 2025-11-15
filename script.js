
const questions = [{"text": "Я знаю, каких целей хочу добиться в спорте — ближайших и на будущее.", "category": "Цели", "reverse": false}, {"text": "Я верю, что мои способности подходят для моего вида спорта.", "category": "Уверенность", "reverse": false}, {"text": "Я быстро прихожу в себя после физических и эмоциональных нагрузок.", "category": "Восстановление", "reverse": false}, {"text": "Я продолжаю тренироваться, даже когда не хочется.", "category": "Мотивация", "reverse": false}, {"text": "Я чувствую, что сейчас в хорошей физической форме.", "category": "Физическая форма", "reverse": false}, {"text": "Я часто ошибаюсь на соревнованиях из-за волнения.", "category": "Соревнования", "reverse": true}, {"text": "Я чувствую, что тренер верит в меня.", "category": "Тренер", "reverse": false}, {"text": "Я часто думаю о том, что могу проиграть.", "category": "Эмоции", "reverse": true}, {"text": "Я понимаю, какие шаги мне нужно делать, чтобы достичь своих целей.", "category": "Цели", "reverse": false}, {"text": "Я думаю, что соперники могут влиять на мой результат.", "category": "Уверенность", "reverse": true}, {"text": "Я использую разные способы, чтобы расслабиться и восстановить силы после тренировок.", "category": "Восстановление", "reverse": false}, {"text": "Я придерживаюсь своего режима и мне это даётся легко.", "category": "Мотивация", "reverse": false}, {"text": "Я легко выдерживаю объём и темп тренировок, которые даёт тренер.", "category": "Физическая форма", "reverse": false}, {"text": "Я умею успокаивать себя, когда начинаю волноваться.", "category": "Соревнования", "reverse": false}, {"text": "Я могу открыто говорить тренеру о своих сложностях.", "category": "Тренер", "reverse": false}, {"text": "Когда я волнуюсь, у меня может что-то заболеть, затошнить или скрутить живот.", "category": "Эмоции", "reverse": true}, {"text": "Я ставлю себе реальные и достижимые спортивные цели.", "category": "Цели", "reverse": false}, {"text": "Я считаю, что проигрыш — это опыт и возможность стать лучше.", "category": "Уверенность", "reverse": false}, {"text": "Я умею собраться и настроиться перед соревнованиями.", "category": "Восстановление", "reverse": false}, {"text": "Я хочу развиваться и становиться лучше в спорте.", "category": "Мотивация", "reverse": false}, {"text": "Я редко травмируюсь и хорошо выдерживаю нагрузки.", "category": "Физическая форма", "reverse": false}, {"text": "Я часто плохо сплю перед соревнованиями.", "category": "Соревнования", "reverse": true}, {"text": "Между мной и тренером есть доверие и уважение.", "category": "Тренер", "reverse": false}, {"text": "Мне мешают страхи — например, что могу ошибиться, получить травму или подвести команду.", "category": "Эмоции", "reverse": true}, {"text": "Я слежу за своим прогрессом и меняю план, если это нужно.", "category": "Цели", "reverse": false}, {"text": "Я думаю, что если проиграю, то мне не захочется пробовать снова.", "category": "Уверенность", "reverse": true}, {"text": "Я часто устаю, напрягаюсь или «перегораю» ещё до старта.", "category": "Восстановление", "reverse": true}, {"text": "Иногда я думаю о том, чтобы бросить спорт.", "category": "Мотивация", "reverse": true}, {"text": "Мне часто не хватает сил, чтобы выполнить тренировку до конца.", "category": "Физическая форма", "reverse": true}, {"text": "На важных соревнованиях я сильнее теряюсь и хуже справляюсь с собой.", "category": "Соревнования", "reverse": true}, {"text": "Я чувствую, что тренер часто мной недоволен.", "category": "Тренер", "reverse": true}, {"text": "Я часто раздражаюсь или злюсь, и это мешает мне в спорте.", "category": "Эмоции", "reverse": true}];
const categoriesFull = {"Цели": "Цели и планирование", "Уверенность": "Самооценка и уверенность", "Восстановление": "Восстановление (релаксация и активация)", "Мотивация": "Мотивация и дисциплина", "Физическая форма": "Физическая подготовленность", "Соревнования": "Соревновательная готовность", "Тренер": "Отношения с тренером", "Эмоции": "Эмоциональная стабильность"};

// текстовая оценка общего процента
function getOverallLabel(percent) {
    if (percent < 40) return "Низкий уровень психологической готовности";
    if (percent < 70) return "Средний уровень психологической готовности";
    return "Высокий уровень психологической готовности";
}

// рекомендации по отдельной шкале
function getRecommendation(score) {
    if (score < 4) {
        return "Низкий уровень. Есть выраженные трудности в этой сфере. Стоит осознанно уделить ей больше внимания и при необходимости подключить поддержку специалиста.";
    } else if (score < 7) {
        return "Средний уровень. Базовые навыки сформированы, но есть зоны роста. Важно работать над стабильностью и регулярностью, чтобы превратить эту область в опору.";
    } else {
        return "Высокий уровень. Эта сфера является вашей сильной стороной. Продолжайте поддерживать её, не перегружая себя, и используйте как ресурс в сложные моменты.";
    }
}

let index = 0;
let answers = [];

function startTest() {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("test").classList.remove("hidden");
    document.getElementById("slider").value = 5;
    updateValue();
    loadQuestion();
}

function loadQuestion() {
    const q = questions[index];
    document.getElementById("question").innerText = q.text;
    document.getElementById("counter").innerText = `Вопрос ${index + 1} из ${questions.length}`;
    document.getElementById("progress-bar").style.width = (index / questions.length * 100) + "%";
}

function updateValue() {
    const v = document.getElementById("slider").value;
    document.getElementById("value").innerText = "Оценка: " + v;
}

function nextQuestion() {
    const raw = Number(document.getElementById("slider").value);
    const q = questions[index];
    const finalScore = q.reverse ? (11 - raw) : raw;

    answers.push({ category: q.category, score: finalScore });
    index++;

    if (index < questions.length) {
        document.getElementById("slider").value = 5;
        updateValue();
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("test").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    const grouped = {};
    answers.forEach(a => {
        if (!grouped[a.category]) grouped[a.category] = [];
        grouped[a.category].push(a.score);
    });

    const categoryKeys = Object.keys(grouped);
    const labels = categoryKeys.map(k => categoriesFull[k]);
    const data = categoryKeys.map(k => {
        const arr = grouped[k];
        return arr.reduce((s,v)=>s+v,0) / arr.length;
    });

    const overallRaw = data.reduce((s,v)=>s+v,0) / data.length;
    const overallPercent = Math.round(overallRaw * 10);

    document.getElementById("overall-percent").innerText = overallPercent + "%";
    document.getElementById("overall-label").innerText = getOverallLabel(overallPercent);

    new Chart(document.getElementById("chart"), {
        type: "radar",
        data: {
            labels: labels,
            datasets: [{
                label: "Профиль по шкалам",
                data: data,
                borderColor: "#60a5fa",
                backgroundColor: "rgba(37,99,235,0.25)",
                borderWidth: 2,
                pointRadius: 3
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: { stepSize: 2, color: "#9ca3af" },
                    grid: { color: "rgba(148,163,184,0.5)" },
                    angleLines: { color: "rgba(148,163,184,0.5)" }
                }
            },
            plugins: {
                legend: {
                    labels: { color: "#e5e7eb" }
                }
            }
        }
    });

    let recHTML = "<h2>Рекомендации по шкалам</h2>";
    labels.forEach((label, i) => {
        const percent = Math.round(data[i] * 10);
        recHTML += "<div class='rec-item'><b>" + label +
            " — <span class='percent'>" + percent + "%</span></b><br>" +
            getRecommendation(data[i]) + "</div>";
    });

    document.getElementById("recs").innerHTML = recHTML;
}
