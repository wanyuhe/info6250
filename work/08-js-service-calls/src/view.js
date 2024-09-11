import state from './state.js';

function renderLoginForm() {
    return `
    <div id="login-section" class="center">
      <h2>Login</h2>
      <form id="login-form">
        <input type="text" id="username" placeholder="Username" required>
        <button type="submit">Login</button>
      </form>
      ${state.error ? `<p class="error">${state.error}</p>` : ''}
    </div>
  `;
}

function renderWordView() {
    return `
    <div id="word-section" class="center">
      <h2>Welcome, ${state.username}</h2>
      <form id="update-word-form">
        <h3>Your Stored Word: ${state.word}</h3>
        <input type="text" id="new-word" placeholder="Enter new word" required>
        <button type="submit">Update Word</button>
      </form>
      <button id="logout-btn">Logout</button>
    </div>
  `;
}

function render(state) {
    const root = document.getElementById('app');
    if (state.isLoggedIn()) {
        root.innerHTML = renderWordView();
    } else {
        root.innerHTML = renderLoginForm();
    }
}

export default render;
