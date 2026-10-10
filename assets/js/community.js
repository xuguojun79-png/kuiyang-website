(function () {
  var KEY = "kuiyang-community-v1";
  var form = document.getElementById("post-form");
  var list = document.getElementById("post-list");

  function load() {
    return window.KuiyangStore.get(KEY, [
      {
        id: 1,
        name: "清淡食谱爱好者",
        content: "溃疡期我改成南瓜粥和蒸蛋，疼痛第二天就没那么刺了。",
        likes: 6,
        liked: false,
        time: "示例帖"
      },
      {
        id: 2,
        name: "早睡打卡员",
        content: "连续早睡三天，说话时的牵扯痛轻了很多。把手机放到另一个房间真的有用。",
        likes: 4,
        liked: false,
        time: "示例帖"
      }
    ]);
  }

  function save(items) {
    window.KuiyangStore.set(KEY, items);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render() {
    var items = load().slice().sort(function (a, b) {
      return b.id - a.id;
    });
    list.innerHTML = items.map(function (item) {
      return (
        '<article class="post">' +
        "<strong>" + escapeHtml(item.name) + "</strong>" +
        '<p>' + escapeHtml(item.content) + "</p>" +
        '<p class="lead">' + escapeHtml(item.time) + "</p>" +
        '<button type="button" class="btn btn-ghost" data-like="' + item.id + '">赞 ' + item.likes + "</button>" +
        "</article>"
      );
    }).join("");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var items = load();
    items.push({
      id: Date.now(),
      name: document.getElementById("post-name").value.trim() || "匿名同伴",
      content: document.getElementById("post-content").value.trim(),
      likes: 0,
      liked: false,
      time: new Date().toLocaleString("zh-CN")
    });
    save(items);
    form.reset();
    render();
  });

  list.addEventListener("click", function (event) {
    var btn = event.target.closest("button[data-like]");
    if (!btn) return;
    var id = Number(btn.getAttribute("data-like"));
    var items = load().map(function (item) {
      if (item.id === id) {
        item.liked = !item.liked;
        item.likes += item.liked ? 1 : -1;
        if (item.likes < 0) item.likes = 0;
      }
      return item;
    });
    save(items);
    render();
  });

  render();
})();
