const LOGIN_KEY = "dingle_logged_in";
const HIST_KEY  = "dingle_history";

function getUser()  { return JSON.parse(localStorage.getItem(LOGIN_KEY) || "null"); }
function setUser(u) { localStorage.setItem(LOGIN_KEY, JSON.stringify(u)); }

function addHistory(type, amount, result, note = "") {
  const h = JSON.parse(localStorage.getItem(HIST_KEY) || "[]");
  h.unshift({ type, amount, result, note, time: new Date().toLocaleString() });
  localStorage.setItem(HIST_KEY, JSON.stringify(h));
}

function showBalance(id) {
  const u = getUser();
  if (!u) location = "login.html";
  if (id) document.getElementById(id).textContent = "₦" + u.balance.toLocaleString();
}
