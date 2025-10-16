<<<<<<< HEAD
// admin.js
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://my-live-backend-1.onrender.com";

// Fetch and display bookings
async function loadBookings() {
  try {
    const res = await fetch(`${API_BASE}/api/bookings`);
    if (!res.ok) throw new Error("Failed to fetch bookings");

    const bookings = await res.json();
    const tbody = document.querySelector("#bookingsTable tbody");
    tbody.innerHTML = "";

    bookings.forEach((b) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${b.name}</td>
        <td>${b.phone}</td>
        <td>${b.service}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    alert("Error loading bookings: " + err.message);
  }
}

loadBookings();
=======
// admin.js
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://my-live-backend-1.onrender.com";

// Fetch and display bookings
async function loadBookings() {
  try {
    const res = await fetch(`${API_BASE}/api/bookings`);
    if (!res.ok) throw new Error("Failed to fetch bookings");

    const bookings = await res.json();
    const tbody = document.querySelector("#bookingsTable tbody");
    tbody.innerHTML = "";

    bookings.forEach((b) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${b.name}</td>
        <td>${b.phone}</td>
        <td>${b.service}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    alert("Error loading bookings: " + err.message);
  }
}

loadBookings();
>>>>>>> 610ff101ec1771bf4b78b70d01ccf32e46123dbd
