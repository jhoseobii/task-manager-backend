const BASE_URL = "http://localhost:5000";

// helper functions 
function getTokenPayload() {
  const token = localStorage.getItem("token");
  return JSON.parse(atob(token.split(".")[1]));
}

function toggleProfile() {
  const box = document.getElementById("profileBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function showHome() {
  document.getElementById("homeSection").style.display = "block";
  document.getElementById("tasksSection").style.display = "none";
  document.getElementById("msg").innerText = "";
}

function showTasks() {
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("tasksSection").style.display = "block";
  document.getElementById("msg").innerText = "";
  loadTasks();
}


//auth related actions
async function register() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput,
      email: emailInput,
      password: passwordInput
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText =
      data.message || "Registration failed";
  }
}


async function login() {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText =
      data.message || "Login failed";
  }
}


async function loadProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const user = await res.json();

  document.getElementById("p-name").innerText = user.name;
  document.getElementById("p-email").innerText = user.email;
}


//task related actions
async function loadTasks() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const tasks = await res.json();
  const container = document.getElementById("tasks");
  container.innerHTML = "";

  //task existence checking
  if (!tasks.length) {
    container.innerHTML = `
      <div style="text-align:center; color:#6b7280; padding:20px;">
        No tasks yet.
      </div>
    `;
    return;
  }

  
  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${task.title}</strong>

      <select class="select"
      onchange="updateStatus('${task._id}', this.value)">
      <option value="todo" ${task.status === "todo" ? "selected" : ""}>To Do</option>
      <option value="in-progress" ${task.status === "in-progress" ? "selected" : ""}>In Progress</option>
      <option value="done" ${task.status === "done" ? "selected" : ""}>Done</option>
      </select>

    <button class="btn btn-danger"
      onclick="deleteTask('${task._id}')">Delete</button>
    `;

    container.appendChild(div);
  });
}


async function createTask() {
  const title = document.getElementById("new-task").value;
  if (!title) return;

  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/api/v1/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  document.getElementById("new-task").value = "";
  document.getElementById("msg").innerText = "Task created successfully";
}


async function saveTask(id, oldTitle) {
  const token = localStorage.getItem("token");
  const newTitle = document.getElementById(`t-${id}`).value;

  await fetch(`${BASE_URL}/api/v1/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title: newTitle })
  });

  document.getElementById("msg").innerText =
    `Task updated from "${oldTitle}" → "${newTitle}"`;
}


async function updateStatus(id, newStatus) {
  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/api/v1/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status: newStatus })
  });
}

async function deleteTask(id) {
  const token = localStorage.getItem("token");
  await fetch(`${BASE_URL}/api/v1/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  loadTasks();
}

if (window.location.pathname.includes("dashboard")) {
  showHome();
  loadProfile();
}
