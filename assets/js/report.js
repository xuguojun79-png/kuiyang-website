(function () {
  var KEY = "kuiyang-tracker-v1";
  var items = window.KuiyangStore.get(KEY, []).slice().sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });
  var empty = document.getElementById("report-empty");
  var content = document.getElementById("report-content");

  if (items.length < 1) {
    empty.hidden = false;
    empty.classList.remove("hidden");
    content.classList.add("hidden");
    return;
  }

  empty.hidden = true;
  empty.classList.add("hidden");
  content.classList.remove("hidden");

  function avg(field) {
    var sum = items.reduce(function (s, item) {
      return s + Number(item[field]);
    }, 0);
    return (sum / items.length).toFixed(1);
  }

  function trend(field) {
    if (items.length < 2) return "记录还少，趋势暂不明显。";
    var first = items.slice(0, Math.ceil(items.length / 2));
    var last = items.slice(Math.floor(items.length / 2));
    var a = first.reduce(function (s, i) { return s + Number(i[field]); }, 0) / first.length;
    var b = last.reduce(function (s, i) { return s + Number(i[field]); }, 0) / last.length;
    var diff = b - a;
    if (Math.abs(diff) < 0.4) return "近期变化不大，继续保持观察。";
    if (field === "pain" || field === "stress") {
      return diff < 0 ? "整体在下降，护理可能正在起效。" : "整体在上升，建议复查诱因或考虑就医。";
    }
    return diff > 0 ? "睡眠评分上升，恢复条件更好。" : "睡眠评分下降，优先把作息稳住。";
  }

  document.getElementById("avg-pain").textContent = avg("pain");
  document.getElementById("avg-sleep").textContent = avg("sleep");
  document.getElementById("avg-stress").textContent = avg("stress");
  document.getElementById("count-log").textContent = String(items.length);
  document.getElementById("trend-pain").textContent = trend("pain");
  document.getElementById("trend-sleep").textContent = trend("sleep");
  document.getElementById("trend-stress").textContent = trend("stress");

  var latest = items[items.length - 1];
  var first = items[0];
  document.getElementById("range-text").textContent =
    "统计区间：" + first.date + " 至 " + latest.date;
})();
