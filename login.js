<<<<<<< HEAD
/*document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.email ? form.email.value : "";
  const phone = form.phone ? form.phone.value : "";
  const password = form.password.value;

  console.log("Login payload:", { email, phone, password }); // Debug

  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, password }),
    });

    const data = await res.json();
    console.log("Login response:", data); // Debug
    if (!res.ok) throw new Error(data.error || "Login failed");

    // Save JWT token + role in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("isAdmin", data.isAdmin);

    alert("✅ Login successful!");
    // Redirect based on role
    if (data.isAdmin) {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "index.html"; // or user dashboard
    }
  } catch (err) {
    alert("❌ " + err.message);
    console.error("Login error:", err); // Debug
  }
=======
/*document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.email ? form.email.value : "";
  const phone = form.phone ? form.phone.value : "";
  const password = form.password.value;

  console.log("Login payload:", { email, phone, password }); // Debug

  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, password }),
    });

    const data = await res.json();
    console.log("Login response:", data); // Debug
    if (!res.ok) throw new Error(data.error || "Login failed");

    // Save JWT token + role in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("isAdmin", data.isAdmin);

    alert("✅ Login successful!");
    // Redirect based on role
    if (data.isAdmin) {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "index.html"; // or user dashboard
    }
  } catch (err) {
    alert("❌ " + err.message);
    console.error("Login error:", err); // Debug
  }
>>>>>>> 610ff101ec1771bf4b78b70d01ccf32e46123dbd
});*/