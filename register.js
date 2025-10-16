/*document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = e.target.phone.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");

    alert("✅ Registration successful! You can now log in.");
    window.location.href = "login.html";
  } catch (err) {
    alert("❌ " + err.message);
  }
});*/