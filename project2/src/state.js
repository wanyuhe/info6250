import { MESSAGES } from './constants';

const state = {
    isLoggedIn: false,
    isLoginPending: false,
    isMessagePending: false,
    messages: [],
    sessions: {},
    username: '',
    error: '',
};

export function waitOnLogin() {
    state.isLoggedIn = false;
    state.isLoginPending = true;
    state.username = '';
    state.messages = {};
    state.error = '';
}

export function login(username) {
    state.isLoggedIn = true;
    state.isLoginPending = false;
    state.username = username;
    state.messages = {};
    state.error = '';
}

export function logout() {
    state.isLoggedIn = false;
    state.isLoginPending = false;
    state.username = '';
    state.messages = {};
    state.error = '';
}

export function waitOnMessages() {
    state.Messages = {};
    state.isMessagePending = true;
    state.error = '';
}

export function setMessages(messages) {
    state.messages = messages.chatMessages;
    state.sessions = messages.users;
    state.isMessagePending = false;
    state.error = '';
}

export function addMessage(message) {
    state.messages.push(message);
    state.error = '';
}

export function setError(error) {
    if(!error) {
        state.error = '';
        return;
    }
    state.isLoginPending = false;
    state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;

