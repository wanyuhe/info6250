import { SERVER, CLIENT } from './constants';
import state, {
    login,
    logout,
    waitOnMessages,
    setMessages,
    setError,
} from './state';

import {
    fetchSession,
    fetchMessages,
} from './services';

import render from './render';
import {
    addAbilityToLogin,
    addAbilityToLogout,
    addAbilityToSendMessage,
    addAbilityToRefresh,
    refreshPage,
} from './listener';

const appEl = document.querySelector('#app');
addAbilityToLogin({ state, appEl }); 
addAbilityToLogout({ state, appEl });
addAbilityToSendMessage({ state, appEl });
addAbilityToRefresh({ state, appEl });
checkForSession();

setInterval(() => refreshPage({ state, appEl }), 5000);

function checkForSession() {
    fetchSession()
        .then(session => {
            login(session.username);
            render({ state, appEl });
            return fetchMessages()
        })
        .catch(err => {
            if (err?.error === SERVER.AUTH_MISSING) {
                return Promise.reject({ error: CLIENT.NO_SESSION });
            }
            return Promise.reject(err);
        })
        .then(messages => {
            setMessages(messages);
            render({ state, appEl });
        })
        .catch(err => {
            if (err?.error == CLIENT.NO_SESSION) {
                logout();
                render({ state, appEl });
                return;
            }
            setError(err?.error || 'ERROR');
            render({ state, appEl });
        });
}
