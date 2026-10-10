(function () {
  var questions = [
    {
      q: "这次口腔溃疡已经持续多久？",
      options: ["3天以内", "4-7天", "8-14天", "超过2周仍未愈合"]
    },
    {
      q: "目前溃疡的数量和大小更接近哪一种？",
      options: ["1个、较小", "2-3个、中等", "多个或较大", "此起彼伏、反复新发"]
    },
    {
      q: "疼痛对进食和说话的影响？",
      options: ["几乎不影响", "吃酸辣时明显", "只能吃温软食物", "疼痛剧烈、影响睡眠"]
    },
    {
      q: "近一年复发情况？",
      options: ["偶尔一次", "大约每季度一次", "每月都可能发作", "几乎持续不断"]
    },
    {
      q: "是否伴随其他情况？",
      options: ["没有其他不适", "轻度疲倦或上火感", "发热、淋巴结肿大", "体重下降、长期不愈或其他全身症状"]
    },
    {
      q: "最近的生活状态？",
      options: ["作息规律、压力可控", "偶尔熬夜", "连续熬夜或高压", "长期睡眠差且饮食很不规律"]
    }
  ];

  var answers = [];
  var index = 0;
  var intro = document.getElementById("screen-intro");
  var quiz = document.getElementById("screen-quiz");
  var result = document.getElementById("screen-result");
  var qTitle = document.getElementById("question-title");
  var qText = document.getElementById("question-text");
  var optionsBox = document.getElementById("options");
  var nextBtn = document.getElementById("next-btn");
  var resultTitle = document.getElementById("result-title");
  var resultDesc = document.getElementById("result-desc");

  document.getElementById("start-btn").addEventListener("click", function () {
    intro.classList.remove("active");
    quiz.classList.add("active");
    renderQuestion();
  });

  document.getElementById("retry-btn").addEventListener("click", function () {
    answers = [];
    index = 0;
    result.classList.remove("active");
    quiz.classList.add("active");
    renderQuestion();
  });

  function renderQuestion() {
    var item = questions[index];
    qTitle.textContent = "第 " + (index + 1) + " / " + questions.length + " 题";
    qText.textContent = item.q;
    optionsBox.innerHTML = item.options.map(function (opt, i) {
      var selected = answers[index] === i ? " selected" : "";
      return '<button type="button" class="option' + selected + '" data-i="' + i + '">' + opt + "</button>";
    }).join("");
    nextBtn.disabled = answers[index] == null;
    nextBtn.textContent = index === questions.length - 1 ? "查看结果" : "下一题";
  }

  optionsBox.addEventListener("click", function (event) {
    var btn = event.target.closest(".option");
    if (!btn) return;
    answers[index] = Number(btn.getAttribute("data-i"));
    renderQuestion();
  });

  nextBtn.addEventListener("click", function () {
    if (answers[index] == null) return;
    if (index < questions.length - 1) {
      index += 1;
      renderQuestion();
      return;
    }
    showResult();
  });

  function showResult() {
    var score = answers.reduce(function (sum, n) {
      return sum + n;
    }, 0);
    var title;
    var desc;
    if (score <= 5) {
      title = "轻度不适，可先居家护理";
      desc = "目前更像常见的轻度口腔溃疡。建议清淡饮食、温和清洁、保证睡眠，并按21天计划执行。若3-5天明显加重，请就医。";
    } else if (score <= 11) {
      title = "中度影响，需要更规律的护理";
      desc = "疼痛或复发已经开始影响生活。请严格忌口、记录诱因，并用日记跟踪疼痛与睡眠。若超过10天无明显好转，建议口腔科就诊。";
    } else {
      title = "建议尽快就医评估";
      desc = "持续时间、全身症状或反复发作程度较高。本结果不能诊断疾病，但提示不宜只靠自行护理。请及时到口腔科或相关科室就诊。";
    }
    quiz.classList.remove("active");
    result.classList.add("active");
    resultTitle.textContent = title;
    resultDesc.textContent = desc;
  }
})();
