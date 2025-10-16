/*// === admin.js ===
// Fetch and display ALL bookings + update status with buttons

const API_BASE = "http://localhost:8080/api";

// Status → badge color map
const statusColors = {
  pending: "orange",
  confirmed: "blue",
  completed: "green",
  cancelled: "crimson",
};

async function loadAllBookings() {
  const token = localStorage.getItem("token");
  const bookingsDiv = document.getElementById("allBookings");

  bookingsDiv.innerHTML = `
    <div class="spinner"></div>
    <p>Loading all bookings...</p>
  `;

  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load bookings");

    if (data.length === 0) {
      bookingsDiv.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    bookingsDiv.innerHTML = data
      .map(
        (s) => `
        <div class="card booking-card">
          <h3>${s.name} (${s.phone})</h3>
          <p><strong>Service:</strong> ${s.service}</p>
          <p><strong>Date:</strong> ${s.date}</p>
          <p><strong>Time:</strong> ${s.time}</p>
          <p>
            <strong>Status:</strong> 
            <span class="badge" style="background:${
              statusColors[s.status.toLowerCase()] || "gray"
            }">${s.status}</span>
          </p>
          <div class="actions">
            ${
              s.status.toLowerCase() === "pending"
                ? `<button onclick="updateStatus('${s._id}', 'Confirmed')" class="btn-action confirm">✔ Confirm</button>`
                : ""
            }
            ${
              s.status.toLowerCase() === "confirmed"
                ? `<button onclick="updateStatus('${s._id}', 'Completed')" class="btn-action complete">✅ Complete</button>`
                : ""
            }
            ${
              s.status.toLowerCase() !== "cancelled" &&
              s.status.toLowerCase() !== "completed"
                ? `<button onclick="updateStatus('${s._id}', 'Cancelled')" class="btn-action cancel">❌ Cancel</button>`
                : ""
            }
          </div>
        </div>
      `
      )
      .join("");
  } catch (err) {
    bookingsDiv.innerHTML = `<p style="color: crimson;">❌ ${err.message}</p>`;
  }
}

async function updateStatus(id, newStatus) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");

    alert(`✅ Booking updated to ${newStatus}`);
    loadAllBookings();
  } catch (err) {
    alert("❌ " + err.message);
  }
}

document.addEventListener("DOMContentLoaded", loadAllBookings);
*/