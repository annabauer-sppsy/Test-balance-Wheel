
// --- ВОПРОСЫ ---

const questions = [
  // цикл 1
  {text:"Я знаю, каких целей хочу добиться в спорте — ближайших и на будущее.", cat:"Цели и планирование", short:"Цели", reverse:false},
  {text:"Я верю, что мои способности подходят для моего вида спорта.", cat:"Самооценка и уверенность", short:"Уверенность", reverse:false},
  {text:"Я быстро прихожу в себя после физических и эмоциональных нагрузок.", cat:"Восстановление", short:"Восстановление", reverse:false},
  {text:"Я продолжаю тренироваться, даже когда не хочется.", cat:"Мотивация и дисциплина", short:"Мотивация", reverse:false},
  {text:"Я чувствую, что сейчас в хорошей физической форме.", cat:"Физическая подготовка", short:"Физическая", reverse:false},
  {text:"Я часто ошибаюсь на соревнованиях из-за волнения.", cat:"Соревновательная готовность", short:"Соревнования", reverse:true},
  {text:"Я чувствую, что тренер верит в меня.", cat:"Отношения с тренером", short:"Тренер", reverse:false},
  {text:"Я часто думаю о том, что могу проиграть.", cat:"Эмоциональная стабильность", short:"Эмоции", reverse:true},

  // цикл 2
  {text:"Я понимаю, какие шаги мне нужно делать, чтобы достичь своих целей.", cat:"Цели и планирование", short:"Цели", reverse:false},
  {text:"Я думаю, что соперники могут влиять на мой результат.", cat:"Самооценка и уверенность", short:"Уверенность", reverse:true},
  {text:"Я использую разные способы, чтобы расслабиться и восстановить силы после тренировок.", cat:"Восстановление", short:"Восстановление", reverse:false},
  {text:"Я придерживаюсь своего режима и мне это даётся легко.", cat:"Мотивация и дисциплина", short:"Мотивация", reverse:false},
  {text:"Я легко выдерживаю объём и темп тренировок, которые даёт тренер.", cat:"Физическая подготовка", short:"Физическая", reverse:false},
  {text:"Я умею успокаивать себя, когда начинаю волноваться.", cat:"Соревновательная готовность", short:"Соревнования", reverse:false},
  {text:"Я могу открыто говорить тренеру о своих сложностях.", cat:"Отношения с тренером", short:"Тренер", reverse:false},
  {text:"Когда я волнуюсь, у меня может что-то заболеть, затошнить или скрутить живот.", cat:"Эмоциональная стабильность", short:"Эмоции", reverse:true},

  // цикл 3
  {text:"Я ставлю себе реальные и достижимые спортивные цели.", cat:"Цели и планирование", short:"Цели", reverse:false},
  {text:"Я считаю, что проигрыш — это опыт и возможность стать лучше.", cat:"Самооценка и уверенность", short:"Уверенность", reverse:false},
  {text:"Я умею собраться и настроиться перед соревнованиями.", cat:"Восстановление", short:"Восстановление", reverse:false},
  {text:"Я хочу развиваться и становиться лучше в спорте.", cat:"Мотивация и дисциплина", short:"Мотивация", reverse:false},
  {text:"Я редко травмируюсь и хорошо выдерживаю нагрузки.", cat:"Физическая подготовка", short:"Физическая", reverse:false},
  {text:"Я часто плохо сплю перед соревнованиями.", cat:"Соревновательная готовность", short:"Соревнования", reverse:true},
  {text:"Между мной и тренером есть доверие и уважение.", cat:"Отношения с тренером", short:"Тренер", reverse:false},
  {text:"Мне мешают страхи — например, что могу ошибиться, получить травму или подвести команду.", cat:"Эмоциональная стабильность", short:"Эмоции", reverse:true},

  // цикл 4
  {text:"Я слежу за своим прогрессом и меняю план, если это нужно.", cat:"Цели и планирование", short:"Цели", reverse:false},
  {text:"Я думаю, что если проиграю, то мне не захочется пробовать снова.", cat:"Самооценка и уверенность", short:"Уверенность", reverse:true},
  {text:"Я часто устаю, напрягаюсь или «перегораю» ещё до старта.", cat:"Восстановление", short:"Восстановление", reverse:true},
  {text:"Иногда я думаю о том, чтобы бросить спорт.", cat:"Мотивация и дисциплина", short:"Мотивация", reverse:true},
  {text:"Мне часто не хватает сил, чтобы выполнить тренировку до конца.", cat:"Физическая подготовка", short:"Физическая", reverse:true},
  {text:"На важных соревнованиях я сильнее теряюсь и хуже справляюсь с собой.", cat:"Соревновательная готовность", short:"Соревнования", reverse:true},
  {text:"Я чувствую, что тренер часто мной недоволен.", cat:"Отношения с тренером", short:"Тренер", reverse:true},
  {text:"Я часто раздражаюсь или злюсь, и это мешает мне в спорте.", cat:"Эмоциональная стабильность", short:"Эмоции", reverse:true},
];

let indexQ = 0;
let answers = [];

function startTest(){
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("test").classList.remove("hidden");
  document.getElementById("slider").value = 5;
  updateValue();
  loadQuestion();
}

function loadQuestion(){
  const q = questions[indexQ];
  document.getElementById("counter").innerText = `Вопрос ${indexQ+1} из ${questions.length}`;
  document.getElementById("question").innerText = q.text;
  document.getElementById("slider").value = 5;
  updateValue();
  document.getElementById("progress-bar").style.width =
    (indexQ / questions.length * 100) + "%";
}

function updateValue(){
  const v = Number(document.getElementById("slider").value);
  document.getElementById("value").innerText = "Оценка: " + v;
}

function nextQuestion(){
  const raw = Number(document.getElementById("slider").value);
  const q = questions[indexQ];
  const score = q.reverse ? (11 - raw) : raw;
  answers.push({cat:q.cat, short:q.short, score});

  indexQ++;
  if(indexQ >= questions.length){
    showResults();
  } else {
    loadQuestion();
  }
}

function showResults(){
  document.getElementById("test").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const grouped = {};
  answers.forEach(a=>{
    if(!grouped[a.cat]) grouped[a.cat] = [];
    grouped[a.cat].push(a.score);
  });

  const fullCats = [
    "Цели и планирование",
    "Самооценка и уверенность",
    "Восстановление",
    "Мотивация и дисциплина",
    "Физическая подготовка",
    "Соревновательная готовность",
    "Отношения с тренером",
    "Эмоциональная стабильность"
  ];

  const shortCats = ["Цели","Уверенность","Восстановление","Мотивация","Физическая","Соревнования","Тренер","Эмоции"];

  const data = [];
  const percentsByCat = {};

  fullCats.forEach(cat=>{
    const arr = grouped[cat] || [0,0,0,0];
    const avg = arr.reduce((s,v)=>s+v,0) / arr.length;
    const percent = Math.round(avg/10*100);
    data.push(percent);
    percentsByCat[cat] = percent;
  });

  const overall = Math.round(data.reduce((s,v)=>s+v,0)/data.length);
  document.getElementById("overall-percent").innerText = overall + "%";
  document.getElementById("overall-label").innerText = getOverallLabel(overall);
  document.getElementById("overall-text").innerText = getOverallText(overall);

  renderWeakAreas(percentsByCat);
  renderChart(shortCats, data);
  renderScaleDescriptions(percentsByCat);
  setupSmartButton(percentsByCat, overall);
}

function getOverallLabel(p){
  if(p < 40) return "Низкий уровень психологической готовности";
  if(p < 70) return "Средний уровень психологической готовности";
  return "Высокий уровень психологической готовности";
}

function getOverallText(p){
  if(p < 40) {
    return "Показатель отражает, что текущая психологическая готовность снижена, и внутренние ресурсы не работают. Если вы планируете развиваться дальше, важно уделить внимание психологической стороне подготовки. Работа со спортивным психологом поможет разобраться в том, что сейчас мешает, и постепенно выстроить состояние, которое будет поддерживать рост и давать больше уверенности на соревнованиях. ";
  } else if(p < 70) {
    return "У вас сформирована хорошая психологическая база, и многие внутренние навыки уже надёжно поддерживают ваш тренировочный процесс. При этом есть компоненты, которые требуют большего внимания, чтобы общая устойчивость и качество подготовки стали выше. Если вы хотите развиваться в спорте дальше, работа с этими сферами станет важным шагом. Консультация спортивного психолога поможет выстроить стратегии для более стабильных и уверенных выступлений.";
  } else {
    return "Ваш психологический профиль сбалансирован и поддерживает высокий уровень подготовки. Точечное развитие отдельных компонентов позволит усиливать преимущества и повышать стабильность результата.";
  }
}

// Слабые зоны (<=53% все)
function renderWeakAreas(percentsByCat){
  const items = Object.keys(percentsByCat).map(cat => ({
    name: cat,
    percent: percentsByCat[cat]
  }));

  const weak = items
    .filter(i => i.percent <= 53)
    .sort((a,b)=>a.percent - b.percent);

  const block = document.getElementById("weak-areas");

  if (!weak.length){
    block.innerText = "Сейчас нет выраженно слабых сфер — профиль достаточно сбалансирован.";
    return;
  }

  let html = "<b>Зоны, которые стоит усилить:</b><br>";
  weak.forEach(item=>{
    html += `${item.name} (${item.percent}%)<br>`;
  });
  block.innerHTML = html;
}

// Рендер радара с мягкой анимацией
function renderChart(shortCats, data){
  const ctx = document.getElementById("chart");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: shortCats,
      datasets: [{
        label: "",
        data: data,
        backgroundColor: "rgba(80,150,255,0.24)",
        borderColor: "rgba(163,191,255,0.95)",
        borderWidth: 2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgba(15,23,42,1)",
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 900,
        easing: "easeOutCubic"
      },
      plugins: {
        legend: { display:false }
      },
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: { display:false },
          grid: { color:"rgba(148,163,184,0.35)" },
          angleLines: { color:"rgba(148,163,184,0.35)" },
          pointLabels: {
            font: { size: 13 },
            color: "#e5e7eb"
          }
        }
      },
      elements: {
        line: {
          tension: 0.18,
          borderWidth: 2
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          hitRadius: 6,
          borderWidth: 2
        }
      }
    }
  });
}

// Описания по шкалам
function renderScaleDescriptions(percentsByCat){
  const container = document.getElementById("scales-descriptions");
  container.innerHTML = "<h3>Профиль по каждому компоненту</h3>";
  Object.keys(percentsByCat).forEach(cat=>{
    const p = percentsByCat[cat];
    container.innerHTML += getScaleDescription(cat, p);
  });
}

function getScaleDescription(category, percent) {
    let level = "";
    let text = "";

    if (percent <= 24) level = "Очень низкий уровень";
    else if (percent <= 49) level = "Ниже среднего";
    else if (percent <= 74) level = "Хороший уровень";
    else level = "Высокий уровень";

    switch (category) {

        case "Цели и планирование":
            if (percent <= 24) {
                text = "Сейчас вам может не хватать ясности в целях и общем направлении, из-за чего сложнее чувствовать устойчивость в подготовке. Чёткие ориентиры помогают выстраивать спокойный и понятный маршрут развития, поэтому возвращение к формулировке целей может стать хорошим шагом вперёд.";
            } else if (percent <= 49) {
                text = "Цели формулируются непоследовательно, что затрудняет удержание фокуса и снижает ощущение направленности. План действий может изменяться или нарушаться без анализа, из-за чего прогресс плохо ощущается. Чёткая структура и понятные шаги помогут восстановить ощущение контроля и дать сделать тренировочный процесс устойчивым и направленным.";
            } else if (percent <= 74) {
                text = "У вас есть понимание основных шагов и способов отслеживать прогресс. Планирование в целом работает, но ему не всегда хватает регулярности — из-за этого периодически теряется ощущение динамики и направленности.";
            } else {
                text = "Цели сформированы чётко, и вы хорошо понимаете, в каком направлении движетесь и какие шаги для этого нужны. Внутренняя структура планирования работает надёжно и поддерживает устойчивость в подготовке, позволяя сохранять высокий уровень собранности и фокуса.";
            }
            break;

        case "Самооценка и уверенность":
            if (percent <= 24) {
                text = "Уверенность в своих способностях заметно снижена, и влияние внешних факторов ощущается сильнее, чем собственная опора. Ошибки и неудачи воспринимаются тяжело, что ослабляет желание продолжать движение вперёд.";
            } else if (percent <= 49) {
                text = "Бывает сложно опираться на свои силы, особенно когда присутствует давление или конкуренция. Ошибки могут вызывать сомнения, и уверенность становится нестабильной — то усиливается, то резко снижается. ";
            } else if (percent <= 74) {
                text = "У вас есть хорошая основа уверенности, но в напряжённых ситуациях она может кратковременно проседать. Возникают моменты, когда влияние соперников или страх ошибки временно ослабляют внутреннюю устойчивость. Уточнение внутренних опор и работа с восприятием неудач помогут удерживать уверенность более ровно.";
            } else {
                text = "Вы уверенно опираетесь на свои способности и в большинстве ситуаций сохраняете внутреннюю стабильность. Вы умеете извлекать пользу даже из неудач и меньше подвержены давлению со стороны соперников.";
            }
            break;

        case "Восстановление":
            if (percent <= 24) {
                text = "Высокий риск переутомления и эмоционального выгорания: нагрузка накапливается быстрее, чем организм успевает её компенсировать. Недостаточно развитые навыки расслабления и регулирования уровня активации делают состояние менее устойчивым и затрудняют восстановление после стрессовых периодов.";
            } else if (percent <= 49) {
                text = "Возможны трудности в возвращении к оптимальному состоянию после нагрузок: напряжение накапливается, а энергия восстанавливается неравномерно. Иногда бывает сложно расслабиться после интенсивной работы или, наоборот, собраться перед стартом. Более регулярный и продуманный подход к восстановлению поможет удерживать состояние ровнее и уменьшить перепады.";
            } else if (percent <= 74) {
                text = "Навыки релаксации и активации в целом работают эффективно, но под сильным стрессом эффективность привычных способов может снижаться.";
            } else {
                text = "Восстановление выстроено хорошо: вы умеете расслабляться, переключаться и настраиваться в нужный момент. Уровень напряжения остаётся управляемым, а самочувствие — стабильным даже при высокой нагрузке. Поддержание текущих методов позволит сохранять этот уровень устойчивости и выдерживать растущий темп подготовки.";
            }
            break;

        case "Мотивация и дисциплина":
            if (percent <= 24) {
                text = "Мотивация нестабильна: желание двигаться вперёд быстро снижается под нагрузкой, а мысли о том, чтобы всё прекратить, возникают чаще, чем хотелось бы. Режим выдерживается с трудом, и это создаёт ощущение постоянного напряжения. Сейчас важно восстановить связь с тем, ради чего вы тренируетесь, и вернуть чувство внутреннего смысла.";
            } else if (percent <= 49) {
                text = "Мотивация присутствует, но часто зависит от настроения и текущего самочувствия. Следовать режиму удаётся не всегда, и в периоды усталости возникает желание отступить или снизить нагрузку. Укрепление регулярности и напоминание себе о долгосрочных целях помогут удерживать направление ровнее.";
            } else if (percent <= 74) {
                text = "Мотивация и дисциплина в целом выстроены: вы понимаете, ради чего тренируетесь, и способны поддерживать режим. Однако в насыщенные периоды возможны краткие колебания, когда эффективность снижается. Более чёткие привычки и способы самоподдержки помогут сохранять стабильность в сложные моменты.";
            } else {
                text = "Мотивация устойчива, и вы способны следовать режиму даже при высокой нагрузке. Желание развиваться подкрепляет дисциплину, а внутренняя сфокусированность помогает удерживать направление. Поддержание этих привычек позволит сохранять текущий уровень и двигаться вперед.";
            }
            break;

        case "Физическая подготовка":
            if (percent <= 24) {
                text = "Физическое состояние ощущается нестабильным: силы могут заканчиваться раньше, чем планируется, а восприятие нагрузки остаётся тяжёлым. Повышенная утомляемость и риск перегрузок снижают ощущение контроля над тренировочным процессом. Сейчас важно восстановить базовый уровень ресурса и дать организму возможность собраться.";
            } else if (percent <= 49) {
                text = "Форма позволяет выдерживать тренировки, но не всегда спокойно: в отдельные дни энергия падает быстрее, чем нужно, и выполнение плана становится сложнее. Нагрузка ощущается неравномерно, и периодически не хватает сил довести тренировку до конца. ";
            } else if (percent <= 74) {
                text = "Физическая форма в целом хорошая: вы справляетесь с объёмом и темпом, хотя в периоды высокой нагрузки возможны эпизоды утомления или небольших перегрузок. В такие моменты снижается ощущение устойчивости. Точечная работа с режимом восстановления поможет сохранить ровный уровень ресурса.";
            } else {
                text = "Форма стабильная, ресурс достаточный, и нагрузка переносится хорошо. Выдерживание темпа и объёма тренировки не вызывает значимых трудностей, а риск перегрузок остаётся низким. ";
            }
            break;

        case "Соревновательная готовность":
            if (percent <= 24) {
                text = "Страх ошибок и сильное напряжение мешают реализации потенциала. Волнение заметно нарушает технику и принятие решений, из-за чего качество выступления падает именно в тот момент, когда важно показывать свой уровень. Перед стартами состояние становится нестабильным, а стресс воспринимается слишком интенсивно. .";
            } else if (percent <= 49) {
                text = "Волнение перед стартами ощущается достаточно сильно, и справляться с ним получается не всегда. Важность события заметно влияет на уверенность и увеличивает число ошибок. Состояние перед соревнованиями бывает нестабильным — сон, энергия и концентрация могут «плавать». Работа с предстаровыми ритуалами и управлением волнением поможет удерживать состояние ровнее.";
            } else if (percent <= 74) {
                text = "Уровень волнения в большинстве случаев контролируемый, но в напряжённых или значимых стартах возможны колебания. Иногда волнение усиливается и влияет на уверенность или качество действий.";
            } else {
                text = "Сильная соревновательная устойчивость: стресс используется как ресурс, сохраняются фокус и качество исполнения. Вы уверенно контролируете состояние в напряжённых ситуациях, а волнение остаётся в рабочем диапазоне и не снижает точность действий. Умение стабилизироваться перед стартом помогает демонстрировать свой уровень в ответственные моменты и выдерживать высокое давление.";
            }
            break;

        case "Отношения с тренером":
            if (percent <= 24) {
                text = "Коммуникация напряжённая: много недоверия, возможны избегание обсуждений и страх критики. Это создаёт эмоциональную дистанцию и мешает воспринимать взаимодействие как источник поддержки. В таких условиях сложно открыто говорить о своих состояниях, что отражается на уверенности и качестве подготовки..";
            } else if (percent <= 49) {
                text = "Отношения складываются неравномерно: в одних моментах получается работать спокойно, в других появляется напряжение или ощущение, что вы не можете говорить свободно. Из-за этой непоследовательности доверие формируется медленно, а важные вопросы порой остаются не озвученными. ";
            } else if (percent <= 74) {
                text = "Взаимодействие в целом конструктивное, но не всегда достаточно открытое. Вы уважаете друг друга, однако в отдельных ситуациях всё ещё возникает осторожность или желание «подобрать слова». Это не мешает работе, но ограничивает глубину коммуникации. ";
            } else {
                text = "Контакт с тренером выстроен уверенно: присутствуют доверие, поддержка и ясная коммуникация. Вы можете обсуждать сложные моменты без напряжения, а обратная связь воспринимается спокойно и по делу. Такие отношения формируют надёжную психологическую опору и усиливают ваше развитие.";
            }
            break;

        case "Эмоциональная стабильность":
            if (percent <= 24) {
                text = "Эмоциональные реакции сильные и плохо управляемые: частые страхи, сомнения и раздражительность заметно снижают качество выступлений. Под давлением состояние быстро выходит из равновесия, а внутренние переживания занимают много внимания и мешают сохранять фокус. В таком режиме сложно показать свой реальный уровень.";
            } else if (percent <= 49) {
                text = "Эмоции периодически выходят из-под контроля: возникают всплески тревоги, раздражение или сомнения, которые отражаются на качестве выполнения упражнений и общем ходе тренировочного процесса. В отдельные моменты это может влиять и на взаимодействие с окружающими. Состояние требует больше энергии на саморегуляцию и нуждается в дополнительной стабилизации..";
            } else if (percent <= 74) {
                text = "Хорошая эмоциональная устойчивость: реакции на стресс присутствуют, но чаще всего остаются контролируемыми. В отдельных ситуациях возможны колебания — лёгкая тревога или напряжение, которые кратковременно влияют на фокус, но вы достаточно быстро возвращаете управление состоянием. Работа с регуляцией поможет сделать эмоциональный фон ещё стабильнее.";
            } else {
                text = "Эмоциональное состояние устойчивое: реакции остаются в рабочем диапазоне, а стресс не выводит вас из равновесия. Вы сохраняете ясность, контроль и способность принимать решения даже под давлением. Такая стабильность поддерживает качество действий и помогает показывать свой уровень в важных моментах.";
            }
            break;
    }

    return `
        <div class="ios-card">
            <b>${category}</b><br>
            <span style="color:#9db7ff;">Уровень: ${level} (${percent}%)</span>
            <p style="margin-top:6px;color:#dfe7ff;">${text}</p>
        </div>
    `;
}

// ====== PDF СНИМОК ИТОГОВОГО ЭКРАНА ======
function captureResultAsImage(callback){
  const resultEl = document.querySelector("#result");
  if (!resultEl || !html2canvas) {
    alert("Не удалось сформировать изображение отчёта.");
    return;
  }
  html2canvas(resultEl, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    callback(imgData);
  });
}

// ====== МОДАЛКА ВЫБОРА СПОСОБА ДОСТАВКИ ======
function openDeliveryModal(){
  document.getElementById("modal-overlay").classList.remove("hidden");
  document.getElementById("delivery-modal").classList.remove("hidden");
}

function closeDeliveryModal(){
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("delivery-modal").classList.add("hidden");
}

function toggleDeliveryFields(){
  const radios = document.querySelectorAll("input[name='delivery']");
  let mode = "telegram";
  radios.forEach(r=>{ if(r.checked) mode = r.value; });
  if(mode === "telegram"){
    document.getElementById("telegram-field").classList.remove("hidden");
    document.getElementById("email-field").classList.add("hidden");
  } else {
    document.getElementById("telegram-field").classList.add("hidden");
    document.getElementById("email-field").classList.remove("hidden");
  }
}

function submitDelivery(){
  const radios = document.querySelectorAll("input[name='delivery']");
  let mode = "telegram";
  radios.forEach(r=>{ if(r.checked) mode = r.value; });

  if(mode === "telegram"){
    const username = document.getElementById("tg-username").value.trim();
    if(!username){
      alert("Пожалуйста, укажите ваш @username в Telegram.");
      return;
    }
    // Заглушка отправки в Telegram
    captureResultAsImage((imgData)=>{
      console.log("Тестовый режим: отправили бы PDF/картинку в Telegram боту для пользователя:", username);
      alert("Тестовый режим: здесь будет отправка PDF в Telegram-бота для @" + username);
      closeDeliveryModal();
    });
  } else {
    const email = document.getElementById("email-input").value.trim();
    if(!email){
      alert("Пожалуйста, укажите e-mail.");
      return;
    }
    // Заглушка отправки на email
    captureResultAsImage((imgData)=>{
      console.log("Тестовый режим: отправили бы PDF/картинку на e-mail:", email);
      alert("Тестовый режим: здесь будет отправка PDF-отчёта на " + email);
      closeDeliveryModal();
    });
  }
}


// ====== КНОПКА «ПОЛЕЗНЫЕ МАТЕРИАЛЫ» ======
const MATERIALS_URL = 'https://taplink.cc/annabauer/p/11b35e7/';
function openMaterials(){
  const newTab = window.open(MATERIALS_URL, '_blank', 'noopener,noreferrer');
  if (!newTab) window.location.href = MATERIALS_URL;
}

// ====== УМНАЯ КНОПКА ПОСЛЕ РЕЗУЛЬТАТА ======
// После прохождения теста открываем страницу с дальнейшими шагами.
const NEXT_STEPS_URL = 'https://taplink.cc/annabauer/p/11b1d26/';
function setupSmartButton() {
  // Ссылка задана непосредственно в HTML и работает независимо от JS.
}

// ====== ПОДЕЛИТЬСЯ РЕЗУЛЬТАТОМ ======
function shareResults(){
  const canvas = document.getElementById("chart");
  if (!canvas || !canvas.toBlob){
    alert("Не удалось сформировать изображение колеса. Попробуйте обновить страницу после полного прохождения теста.");
    return;
  }

  canvas.toBlob(async function(blob){
    if (!blob){
      alert("Не удалось сформировать изображение результата.");
      return;
    }

    const file = new File([blob], "sport-balance-result.png", { type: "image/png" });

    const testUrl = "https://example.com/"; // TODO: заменить на реальную ссылку на страницу теста
    const shareData = {
      title: "Колесо спортивного баланса",
      text: "Мой результат в тесте «Колесо спортивного баланса». Попробуй и ты:\n" + testUrl,
      files: [file]
    };

    if (navigator.canShare && navigator.canShare(shareData)){
      try {
        await navigator.share(shareData);
      } catch (e){
        console.log("Пользователь отменил отправку", e);
      }
    } else {
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText("Ссылка на тест: " + testUrl)
          .then(()=>alert("Ваше устройство не поддерживает системное «Поделиться», но ссылка на тест скопирована — вы можете отправить её вручную."))
          .catch(()=>alert("Ваше устройство не поддерживает системное «Поделиться». Вы можете сделать скриншот экрана и поделиться им вручную."));
      } else {
        alert("Ваше устройство не поддерживает системное «Поделиться». Вы можете сделать скриншот экрана и поделиться им вручную.");
      }
    }
  }, "image/png");
}


// ===== PDF: точная копия отображаемых результатов =====
// Данные не пересчитываются: берём готовые тексты, проценты и диаграмму из экрана.
// Safari на iPad: системная печать позволяет сохранить длинный отчёт в PDF
// без создания одного гигантского canvas (который может превышать лимит памяти).
function printResultsAsPDF() {
  const result = document.getElementById('result');
  if (!result || result.classList.contains('hidden')) {
    alert('Сначала пройдите тест.');
    return;
  }
  const canvas = document.getElementById('chart');
  let image = document.getElementById('chart-print-image');
  if (canvas && !image) {
    try {
      image = document.createElement('img');
      image.id = 'chart-print-image';
      image.alt = 'Диаграмма спортивного баланса';
      image.src = canvas.toDataURL('image/png');
      image.style.display = 'none';
      canvas.insertAdjacentElement('afterend', image);
    } catch (error) { console.warn('Не удалось подготовить диаграмму для печати:', error); }
  }
  // Print dialog generates a paginated PDF without rendering the entire page to canvas.
  // On iPad: Share the print preview → Save to Files.
  requestAnimationFrame(() => {
    try { window.print(); } catch (error) {
      console.error('Ошибка системной печати:', error);
      alert('Не удалось открыть печать. Попробуйте меню Safari → Поделиться → Печать.');
    }
  });
}

async function downloadResultsPDF() {
  // iOS Safari: печать → развёрнутый предпросмотр → Поделиться → Сохранить в Файлы.
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) { printResultsAsPDF(); return; }

  const source = document.getElementById('result');
  const button = document.getElementById('getPdf');
  if (!source || source.classList.contains('hidden')) {
    alert('Сначала пройдите тест.'); return;
  }
  if (typeof html2pdf === 'undefined') {
    alert('Не удалось загрузить модуль PDF. Проверьте интернет-соединение.'); return;
  }
  const oldLabel = button.textContent;
  button.disabled = true;
  button.textContent = 'Формируем PDF…';
  let holder;
  try {
    const chartCanvas = document.getElementById('chart');
    const chartImage = chartCanvas ? chartCanvas.toDataURL('image/png') : null;
    holder = document.createElement('div');
    holder.className = 'pdf-export-root';
    holder.innerHTML = `
      <div class="pdf-export-header">
        <h1>Колесо спортивного баланса</h1>
        <p>Психологическая готовность спортсмена</p>
      </div>
    `;
    const cloned = source.cloneNode(true);
    cloned.classList.remove('hidden');
    cloned.removeAttribute('id');
    cloned.querySelectorAll('.buttons-row, #getPdf, #smart-btn').forEach(el => el.remove());
    const chartCopy = cloned.querySelector('canvas#chart');
    if (chartCopy && chartImage) {
      const img = document.createElement('img');
      img.src = chartImage;
      img.alt = 'Диаграмма профиля по шкалам';
      img.className = 'pdf-chart-image';
      chartCopy.replaceWith(img);
    }
    holder.appendChild(cloned);
    document.body.appendChild(holder);
    await document.fonts.ready;
    await html2pdf().set({
      margin: [8, 8, 8, 8],
      filename: 'Колесо_спортивного_баланса.pdf',
      image: {type:'jpeg', quality:0.98},
      html2canvas: {scale:2, useCORS:true, backgroundColor:'#0b1225', windowWidth:1100},
      jsPDF: {unit:'mm', format:'a4', orientation:'portrait'},
      pagebreak: {mode:['css','legacy'], avoid:['.ios-card','.chart-card','.summary','.pdf-export-header']}
    }).from(holder).save();
  } catch (error) {
    console.error('Ошибка PDF:', error);
    alert('Не удалось скачать PDF автоматически. Откроем системное сохранение PDF через печать.');
    printResultsAsPDF();
  } finally {
    if (holder) holder.remove();
    button.disabled = false;
    button.textContent = oldLabel;
  }
}
