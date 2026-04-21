const API = "https://quantum-backend-j0aa.onrender.com";

// AUTH
async function auth(type) {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        document.getElementById("authStatus").innerText = "Enter username & password";
        return;
    }

    const res = await fetch(`${API}/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // 🔥 ADD THIS
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    document.getElementById("authStatus").innerText =
        data.message || data.error;
}


// GENERATE KEY
async function genKey() {
    const res = await fetch(`${API}/generate-key`, {
        method: "POST",
        credentials: "include"   // 🔥 ADD THIS
    });

    const data = await res.json();
    document.getElementById("status").innerText =
        data.message || data.error;
}


// ENCRYPT / DECRYPT
async function process(type) {

    const msg = document.getElementById("message").value;

    const res = await fetch(`${API}/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // 🔥 ADD THIS
        body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    if (data.encrypted) {
    document.getElementById("output").innerText = data.encrypted;

    // 🔥 IMPORTANT: auto-fill encrypted text into input box
    document.getElementById("message").value = data.encrypted;
}
else if (data.decrypted) {
    document.getElementById("output").innerText = data.decrypted;
}
else {
    document.getElementById("output").innerText = data.error;
}
}
