// script.js
// ================= API Base =================
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://my-live-backend-1.onrender.com";

// Handle Booking Form
const form = document.getElementById("bookingForm");
const msgEl = document.getElementById("confirmationMsg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      date: formData.get("date"),
      time: formData.get("time"),
    };

    msgEl.textContent = "Processing your booking…";
    msgEl.style.color = "#555";

    try {
      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Booking failed");

      msgEl.textContent = data.message;
      msgEl.style.color = "#ff1493"; // pink confirmation
      form.reset();
    } catch (err) {
      msgEl.textContent = `❗ ${err.message}`;
      msgEl.style.color = "crimson";
    }
  });
}

// Fetch and populate services dropdown
const serviceSelect = document.getElementById("service");
if (serviceSelect) {
  fetch("http://localhost:8080/api/services")
    .then((res) => res.json())
    .then((services) => {
      services.forEach((svc) => {
        const option = document.createElement("option");
        option.value = svc.code;
        option.textContent = `${svc.name} - KES ${svc.priceKES}`;
        serviceSelect.appendChild(option);
      });
    })
    .catch(() => {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Unable to load services";
      serviceSelect.appendChild(option);
    });
}

// ================= Hamburger Toggle =================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

