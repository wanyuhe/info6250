function render({ state, appEl }) {
    const html = `
   <main class="">
     ${generateStatusHtml(state)}
     ${generateLoginHtml(state)}
     ${generateContentHtml(state)}
   </main>
  `;
    appEl.innerHTML = html;
}

function generateStatusHtml(state) {
    return `
      <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml(state) {
    if(state.isLoginPending) {
        return `
      <div class="login__waiting">Logging in...</div>
    `;
    }
    if(state.isLoggedIn) {
        return ``;
    }
    return `
      <div class="login">
        <form class="login__form">
          <label>
            <span>Username:</span>
            <input class="login__username" type="text" value="">
          </label>
          <button class="login__button" type="submit">Login</button>
        </form>
      </div>
  `;
}

function generateContentHtml(state) {
    if (!state.isLoggedIn) {
        return ``;
    }
    if (state.isMessagePending) {
        return `
            <div class="content">
                ${generateControlsHtml(state)}
                <div class="messages__waiting">Loading messages...</div>
            </div>
        `;
    }
    return `
        <div class="content">
            ${generateControlsHtml(state)}
            <div class="messages-container">
            <ul class="messages">${generateMessagesHtml(state)}</ul>
            </div>
            ${generateSendMessageHtml()}
            ${generateUsersListHtml(state)}
        </div>
    `;
}


function generateControlsHtml(state) {
    return `
        <div class="controls">
            <button class="controls__refresh">Refresh</button>
            <button class="controls__logout">Logout</button>
        </div>
    `;
}


function generateMessagesHtml(state) {
    const messagesHtml = Object.values(state.messages).map(message => {
        return `
      <li class="message">
        <span class="message__author">${message.username}:</span>
        <span class="message__text">${message.text}</span>
      </li>
    `;
    }).join('');
    return messagesHtml || `<p>No messages yet， start the conversation!</p>`;
}

function generateSendMessageHtml() {
    return `
        <form class="send__form">
          <input class="send__input" type="text">
          <button type="submit" class="send__button">Send</button>
        </form>
  `;
}

function generateUsersListHtml(state) {
    const usernames = Object.values(state.sessions).map(user => user.username);
    const uniqueUsernames = [...new Set(usernames)];
    const usersListHtml = uniqueUsernames.map(username => {
        return `
            <li class="user">${username}</li>
        `;
    }).join('') || `<p>No other users online.</p>`;
    return `
        <div class="users">
            <h3>Online Users</h3>
            <ul class="users__list">
                ${usersListHtml}
            </ul>
        </div>
    `;
}

export default render;
