/*// === sessions.js ===
// Fetch and display logged-in user's bookings with cancel option

const API_BASE = "http://localhost:8080/api";

// Status → badge color map
const statusColors = {
  pending: "orange",
  confirmed: "blue",
  completed: "green",
  cancelled: "crimson",
};

async function loadSessions() {
  const token = localStorage.getItem("token");
  const sessionsList = document.getElementById("sessionsList");

  sessionsList.innerHTML = `
    <div class="spinner"></div>
    <p>Loading your bookings...</p>
  `;

  try {
    const res = await fetch(`${API_BASE}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load sessions");

    if (data.length === 0) {
      sessionsList.innerHTML = "<p>No bookings yet. Go book one 💅!</p>";
      return;
    }

    sessionsList.innerHTML = data
      .map(
        (s) => `
        <div class="card booking-card">
          <h3>${s.service}</h3>
          <p><strong>Date:</strong> ${s.date}</p>
          <p><strong>Time:</strong> ${s.time}</p>
          <p>
            <strong>Status:</strong> 
            <span class="badge" style="background:${statusColors[s.status] || "gray"}">
              ${s.status}
            </span>
          </p>
          ${
            s.status === "pending"
              ? `<button class="cancel-btn" onclick="cancelBooking('${s.id}')">❌ Cancel</button>`
              : ""
          }
        </div>
      `
      )
      .join("");
  } catch (err) {
    sessionsList.innerHTML = `<p style="color: crimson;">❌ ${err.message}</p>`;
  }
}

async function cancelBooking(id) {
  const token = localStorage.getItem("token");
  if (!confirm("Are you sure you want to cancel this booking?")) return;

  try {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to cancel booking");

    alert("Booking cancelled successfully.");
    loadSessions(); // refresh the list
  } catch (err) {
    alert(`❌ ${err.message}`);
  }
}

document.addEventListener("DOMContentLoaded", loadSessions);
*/