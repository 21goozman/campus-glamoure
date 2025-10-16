// === public/auth.js ===
// Handles Register, Login, Forgot Password, Logout, and Token Management

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : "https://my-live-backend-1.onrender.com/api"; // ✅ Smart base URL switch

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
