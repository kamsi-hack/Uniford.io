// REGISTER USER
function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("unifordUsers")) || [];

  if (users.find(user => user.email === email)) {
    alert("User already exists");
    return;
  }

  users.push({
    name,
    email,
    password,
    class: "",
    subjects: "",
    courses: ""
  });

  localStorage.setItem("unifordUsers", JSON.stringify(users));
  alert("Registration successful!");
}

// LOGIN USER
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("unifordUsers")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid login details");
    return;
  }

  localStorage.setItem("unifordCurrentUser", email);
  window.location.href = "dashboard.html";
}

// LOAD DASHBOARD
document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("unifordCurrentUser");
  if (!email) return;

  const users = JSON.parse(localStorage.getItem("unifordUsers"));
  const user = users.find(u => u.email === email);

  if (document.getElementById("studentName")) {
    document.getElementById("studentName").innerText =
      `Student: ${user.name}`;
    document.getElementById("class").value = user.class;
    document.getElementById("subjects").value = user.subjects;
    document.getElementById("courses").value = user.courses;
  }
});

// SAVE PROGRESS
function saveProgress() {
  const email = localStorage.getItem("unifordCurrentUser");
  const users = JSON.parse(localStorage.getItem("unifordUsers"));

  const user = users.find(u => u.email === email);

  user.class = document.getElementById("class").value;
  user.subjects = document.getElementById("subjects").value;
  user.courses = document.getElementById("courses").value;

  localStorage.setItem("unifordUsers", JSON.stringify(users));
  alert("Progress saved successfully!");
}

// LOGOUT
function logout() {
  localStorage.removeItem("unifordCurrentUser");
  window.location.href = "index.html";
}
