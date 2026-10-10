(function () {
  var KEY = "kuiyang-tracker-v1";
  var form = document.getElementById("tracker-form");
  var list = document.getElementById("log-list");

  function load() {
    return window.KuiyangStore.get(KEY, []);
  }

  function save(items) {
    window.KuiyangStore.set(KEY, items);
  }

  function render() {
    var items = load().slice().sort(function (a, b) {
      return b.date.localeCompare(a.date) || b.id - a.id;
    });
    if (!items.length) {
      list.innerHTML = '<p class="empty">还没有记录。先写下今天的疼痛、睡眠和压力吧。</p>';
      return;
    }
    list.innerHTML = items.map(function (item) {
      return (
        '<article class="log-item">' +
        "<strong>" + item.date + "</strong>" +
        "<p>疼痛 " + item.pain + " / 睡眠 " + item.sleep + " / 压力 " + item.stress + "</p>" +
        (item.note ? "<p>" + escapeHtml(item.note) + "</p>" : "") +
        '<button type="button" class="btn btn-danger" data-id="' + item.id + '">删除</button>' +
        "</article>"
      );
    }).join("");
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var items = load();
    items.push({
      id: Date.now(),
      date: document.getElementById("log-date").value,
      pain: Number(document.getElementById("log-pain").value),
      sleep: Number(document.getElementById("log-sleep").value),
      stress: Number(document.getElementById("log-stress").value),
      note: document.getElementById("log-note").value.trim()
    });
    save(items);
    form.reset();
    setToday();
    render();
  });

  list.addEventListener("click", function (event) {
    var btn = event.target.closest("button[data-id]");
    if (!btn) return;
    var id = Number(btn.getAttribute("data-id"));
    save(load().filter(function (item) {
      return item.id !== id;
    }));
    render();
  });

  function setToday() {
    var dateInput = document.getElementById("log-date");
    if (!dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 10);
    }
  }

  setToday();
  render();
})();
