// === public/auth.js ===
// Handles Register, Login, Forgot Password, Logout, and Token Management

const API_BASE = "http://localhost:8080/api"; // Change for production

/*// --- Register ---
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const payload = {
      phone: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Registration failed");

      document.getElementById("registerMsg").textContent = "✅ " + data.message;
      registerForm.reset();
      setTimeout(() => (window.location.href = "login.html"), 1000);
    } catch (err) {
      console.error("Register error:", err);
      document.getElementById("registerMsg").textContent = "❌ " + err.message;
    }
  });
}*/

/*// --- Login ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const payload = {
      phone: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Login failed");

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("isAdmin", data.user.isAdmin ? "true" : "false");

      document.getElementById("loginMsg").textContent = "✅ " + data.message;
      setTimeout(() => (window.location.href = "my-sessions.html"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      document.getElementById("loginMsg").textContent = "❌ " + err.message;
    }
  });*/
}

// --- Forgot Password ---
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = new FormData(forgotForm).get("email");

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Request failed");

      document.getElementById("forgotMsg").textContent = "📩 " + data.message;
    } catch (err) {
      console.error("Forgot password error:", err);
      document.getElementById("forgotMsg").textContent = "❌ " + err.message;
    }
  });
}

// --- Logout ---
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
}

// --- Token utilities ---
function getTokenPayload() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(atob(base64Payload));
  } catch {
    return null;
  }
}

// --- Page protection ---
function protectPage(requiredRole = null) {
  const payload = getTokenPayload();

  if (!payload) {
    alert("⚠ You must log in first!");
    window.location.href = "login.html";
    return;
  }

  if (requiredRole && payload.role !== requiredRole) {
    alert("⛔ Access denied!");
    window.location.href = "index.html";
  }
}

// --- HTML Changes ---
// Make sure your forms include:
// <input type="text" name="phone" placeholder="Phone (optional)">
// <input type="email" name="email" placeholder="Email (optional)">
// <input type="password" name="password" placeholder="Password" required>
