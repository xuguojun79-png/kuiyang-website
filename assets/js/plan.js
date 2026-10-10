(function () {
  var KEY = "kuiyang-plan-v1";
  var PHASES = [
    {
      name: "第一阶段：缓解期（第1-7天）",
      intro: "减少刺激、稳住疼痛、建立清洁节奏。",
      days: [
        ["用温水漱口，避免过热过酸食物", "记录疼痛程度", "保证7小时睡眠"],
        ["三餐后轻柔清洁口腔", "暂停辛辣烧烤", "午后放松10分钟"],
        ["观察溃疡大小与数量", "补充温软食物", "避免咬唇咬颊"],
        ["继续温和漱口", "减少碳酸饮料", "睡前不刷太用力"],
        ["检查是否有发热或淋巴结肿大", "白天多喝温水", "晚间早睡"],
        ["复盘本周刺激源", "保持餐具清洁", "短暂散步缓解压力"],
        ["完成阶段小结", "坚持清淡饮食", "为修复期做准备"]
      ]
    },
    {
      name: "第二阶段：修复期（第8-14天）",
      intro: "营养跟上、睡眠补足、压力下降。",
      days: [
        ["增加软质蛋白", "疼痛仍高则减少说话摩擦", "记录睡眠时长"],
        ["补充新鲜蔬果（不刺激者）", "避免熬夜", "做一次肩颈放松"],
        ["评估进食是否改善", "继续温水漱口", "减少加班时长"],
        ["检查是否出现新溃疡", "保持规律三餐", "午间闭眼休息"],
        ["复盘压力来源", "与亲友聊10分钟", "晚饭清淡"],
        ["适度户外活动", "不抽烟不饮酒", "睡前远离屏幕30分钟"],
        ["阶段回顾：疼痛是否下降", "整理有效习惯", "准备巩固期"]
      ]
    },
    {
      name: "第三阶段：巩固期（第15-21天）",
      intro: "把有效习惯固定下来，降低复发。",
      days: [
        ["固定早晚口腔清洁", "继续忌口清单", "记录情绪波动"],
        ["复习诱因清单", "保持饮水", "不熬夜"],
        ["尝试一周菜单模板", "适度运动", "检查唇部是否干燥"],
        ["复盘工作压力", "午休或拉伸", "晚餐不过烫"],
        ["整理21天有效动作", "分享给家人监督", "保持清淡"],
        ["制定复发应对卡", "备好温水与软食", "保证睡眠"],
        ["完成21天总结", "决定保留的3个习惯", "如未愈及时就医"]
      ]
    }
  ];

  var state = window.KuiyangStore.get(KEY, { completed: {}, tasks: {} });
  var root = document.getElementById("plan-root");
  var bar = document.getElementById("plan-progress");
  var label = document.getElementById("plan-progress-text");
  var resetBtn = document.getElementById("reset-plan");

  function totalDays() {
    return PHASES.reduce(function (sum, phase) {
      return sum + phase.days.length;
    }, 0);
  }

  function render() {
    var html = "";
    var dayNo = 0;
    PHASES.forEach(function (phase, pIndex) {
      html += '<section class="phase"><h2>' + phase.name + "</h2><p class='lead'>" + phase.intro + "</p>";
      phase.days.forEach(function (tasks, dIndex) {
        dayNo += 1;
        var done = !!state.completed[dayNo];
        html += '<article class="day' + (done ? " done" : "") + '" data-day="' + dayNo + '">';
        html += '<div class="day-head"><strong>第' + dayNo + "天</strong>";
        html += '<label><input type="checkbox" class="day-check" data-day="' + dayNo + '"' + (done ? " checked" : "") + "> 本日完成</label></div>";
        html += '<ul class="tasks">';
        tasks.forEach(function (task, tIndex) {
          var key = dayNo + "-" + tIndex;
          var checked = !!(state.tasks[key]);
          html += '<li><label><input type="checkbox" class="task-check" data-key="' + key + '"' + (checked ? " checked" : "") + "> " + task + "</label></li>";
        });
        html += "</ul></article>";
      });
      html += "</section>";
    });
    root.innerHTML = html;
    updateProgress();
  }

  function updateProgress() {
    var doneCount = Object.keys(state.completed).filter(function (k) {
      return state.completed[k];
    }).length;
    var percent = Math.round((doneCount / totalDays()) * 100);
    bar.style.width = percent + "%";
    label.textContent = "已完成 " + doneCount + " / 21 天（" + percent + "%）";
  }

  root.addEventListener("change", function (event) {
    var target = event.target;
    if (target.classList.contains("day-check")) {
      var day = target.getAttribute("data-day");
      state.completed[day] = target.checked;
      window.KuiyangStore.set(KEY, state);
      render();
    }
    if (target.classList.contains("task-check")) {
      state.tasks[target.getAttribute("data-key")] = target.checked;
      window.KuiyangStore.set(KEY, state);
    }
  });

  resetBtn.addEventListener("click", function () {
    if (confirm("确定清空21天进度吗？")) {
      state = { completed: {}, tasks: {} };
      window.KuiyangStore.set(KEY, state);
      render();
    }
  });

  render();
})();
