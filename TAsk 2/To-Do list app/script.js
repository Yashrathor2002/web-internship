const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");
const themeToggle = document.getElementById("theme-toggle");

// ✅ Add Task
addBtn.addEventListener("click", addTask);

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please enter a task!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // × symbol
    li.appendChild(span);

    saveData();
  }
  inputBox.value = "";
}

// ✅ Check / Delete Task
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// ✅ Save to LocalStorage
function saveData() {
  localStorage.setItem("todoData", listContainer.innerHTML);
}

// ✅ Load tasks on refresh
function showTasks() {
  listContainer.innerHTML = localStorage.getItem("todoData");
}
showTasks();

// ✅ Allow Enter key
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

// 🌙 Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Change icon based on mode
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// 🧠 Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}
