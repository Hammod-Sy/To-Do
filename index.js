window.addEventListener("load", function () {
  const loadingPage = document.getElementById("loading-page");
  setTimeout(function () {
    loadingPage.style.display = "none";
    
    // After loading animation finishes, display the task list
    taskList.style.display = "block";
    
    // Retrieve tasks from local storage and display them
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const task of storedTasks) {
      createTaskElement(task);
    }
  }, 2000);
});

const modeToggle = document.getElementById("mode-toggle");
const body = document.body;
const darkLabel = document.querySelector(".dark-label");
const lightLabel = document.querySelector(".light-label");

lightLabel.style.display = "none";

modeToggle.addEventListener("change", function () {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    darkLabel.style.display = "none";
    lightLabel.style.display = "block";
    parentElement.style.backgroundColor = "gray";
  } else {
    darkLabel.style.display = "block";
    lightLabel.style.display = "none";
    parentElement.style.backgroundColor = "#f5f5f5";
  }
});

// Get the necessary elements
const inputField = document.getElementById("inputF");
const addButton = document.getElementById("btn");
const taskList = document.createElement("div");
taskList.style.display = "none"; // Initially hide the task list

// Function to create a task element
function createTaskElement(taskText) {
  const listItem = document.createElement("div");
  listItem.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      listItem.classList.add("completed");
    } else {
      listItem.classList.remove("completed");
    }
    updateLocalStorage();
  });

  const label = document.createElement("label");
  label.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    listItem.remove();
    updateLocalStorage();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
}

addButton.addEventListener("click", function () {
  const task = inputField.value;
  if (task.trim() !== "") {
    createTaskElement(task);
    updateLocalStorage();
    inputField.value = "";
  }
});

function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll("label")).map(
    (label) => label.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const parentElement = document.querySelector(".parent");
parentElement.appendChild(taskList);

// Optional: Randomize the starting background color
var animatedBackground = document.querySelector(".animated-background");
animatedBackground.style.backgroundColor = getRandomColor();

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
