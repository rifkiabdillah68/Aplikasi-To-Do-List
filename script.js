let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// TAMPILKAN WAKTU
function updateTime() {
  const now = new Date();
  document.getElementById("time").innerText = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
updateTime();

// TAMBAH TASK
function addTask() {
  const text = document.getElementById("taskInput").value;
  const priority = document.getElementById("priority").value;

  if (text === "") return alert("Isi task dulu!");

  tasks.push({
    id: Date.now(),
    text,
    priority,
    done: false,
    date: new Date().toDateString(),
  });

  saveData();
  render();
  document.getElementById("taskInput").value = "";
}

// RENDER TASK
function render() {
  const todoList = document.getElementById("todoList");
  const doneList = document.getElementById("doneList");

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  const today = new Date().toDateString();

  tasks.forEach((task) => {
    if (task.date !== today) return;

    const item = document.createElement("div");
    item.className =
      "flex items-center justify-between p-2 border rounded mb-2";

    item.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${task.id})">
        <div>
          <p class="${task.done ? "line-through text-gray-400" : ""}">${task.text}</p>
          <span class="text-xs text-${getColor(task.priority)}-500">${task.priority}</span>
        </div>
      </div>
      <button onclick="deleteTask(${task.id})" class="text-red-500">X</button>
    `;

    if (task.done) {
      doneList.appendChild(item);
    } else {
      todoList.appendChild(item);
    }
  });
}