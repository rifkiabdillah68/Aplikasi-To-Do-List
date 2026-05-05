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