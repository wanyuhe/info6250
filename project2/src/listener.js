import {
    fetchMessages,
    sendMessage,
    fetchLogin,
    fetchLogout,
} from "./services";

import {
    waitOnLogin,
    login,
    logout,
    waitOnMessages,
    setMessages,
    addMessage,
    setError,
} from './state';

import render from './render';


export function addAbilityToLogin({ state, appEl }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('login__form')) {
            return;
        }
        e.preventDefault();

        const username = appEl.querySelector('.login__username').value;
        waitOnLogin();
        render({ state, appEl });
        fetchLogin(username)
            .then(userSession => {
                login(userSession.username);
                return fetchMessages();  
            })
            .then(messages => {
                setMessages(messages);
                render({ state, appEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}

export function addAbilityToLogout({ state, appEl }) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('controls__logout')) {
            return;
        }
        logout();
        render({ state, appEl });
        fetchLogout()
            .catch(err => {
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}

export function addAbilityToRefresh({ state, appEl }) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('controls__refresh')) {
            return;
        }

        waitOnMessages();
        render({ state, appEl });
        fetchMessages()
            .then(messages => {
                setMessages(messages);
                render({ state, appEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}

export function refreshPage({ state, appEl }) {
    if (state.isLoggedIn === false) {
        return;
    }
    waitOnMessages();
    fetchMessages()
    .then(messages => {
        setMessages(messages);
        render({ state, appEl });
    })
    .catch(err => {
        setError(err?.error || 'ERROR');
        render({ state, appEl });
    });
}

export function addAbilityToSendMessage({ state, appEl }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('send__form')) {
            return;
        }
        e.preventDefault();
        const messageInput = appEl.querySelector('.send__input'); 
        const messageText = messageInput.value;
        sendMessage({ text: messageText })
            .then(message => {
                addMessage(message);
                messageInput.value = '';  
                render({ state, appEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}

