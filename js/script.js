
(function () {
  "use strict";
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const THEME_KEY = "portfolio-theme";
  const body = document.body;
  const toggleBtn = qs("#themeToggle");
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") {
    body.classList.add("dark");
    toggleBtn.setAttribute("aria-pressed", "true");
    toggleBtn.firstElementChild.textContent = "☀️";
  }
  toggleBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    toggleBtn.setAttribute("aria-pressed", String(isDark));
    toggleBtn.firstElementChild.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  });
  const headerHeight = qs(".navbar").offsetHeight || 64;
  qsa('a.nav-link[href^="#"], .btn[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const target = qs(targetId);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
  const form = qs("#contactForm");
  const nameInput = qs("#name");
  const emailInput = qs("#email");
  const messageInput = qs("#message");
  const nameError = qs("#nameError");
  const emailError = qs("#emailError");
  const messageError = qs("#messageError");
  const statusEl = qs("#formStatus");
  function validateName() {
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter at least 2 characters.";
      return false;
    }
    nameError.textContent = "";
    return true;
  }
  function validateEmail() {
    const val = emailInput.value.trim();
    const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val || !basic.test(val)) {
      emailError.textContent = "Please enter a valid email address.";
      return false;
    }
    emailError.textContent = "";
    return true;
  }
  function validateMessage() {
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageError.textContent = "Message should be at least 10 characters.";
      return false;
    }
    messageError.textContent = "";
    return true;
  }
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = [validateName(), validateEmail(), validateMessage()].every(Boolean);
    if (!valid) {
      statusEl.textContent = "Please fix the errors above and try again.";
      statusEl.style.color = "#ff6464";
      return;
    }
    statusEl.textContent = "Thanks! Your message has been sent (demo).";
    statusEl.style.color = "var(--accent)";
    form.reset();
  });
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
