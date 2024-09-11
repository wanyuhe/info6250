import { checkSession, fetchLogin, fetchLogout, fetchWord, updateWord } from './services.js';
import render from './view.js';
import state from './state.js';

window.addEventListener('load', async () => {
    const status = await checkSession();
    if (status?.username) {
        fetchWord().then(data => {
            if (data.username) {
                state.setUser(data.username);
                state.setWord(data.storedWord);
            }
            render(state);
        }).catch(err => {
            state.setError(err.error);
            render(state);
        });
    }

})
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').addEventListener('click', event => {
        if (event.target.matches('#logout-btn')) {
            handleLogout();
        }
    });

    document.getElementById('app').addEventListener('submit', event => {
        event.preventDefault();
        if (event.target.matches('#login-form')) {
            const username = document.getElementById('username').value;
            handleLogin(username);
        } else if (event.target.matches('#update-word-form')) {
            const newWord = document.getElementById('new-word').value;
            handleUpdateWord(newWord);
        }
    });
});

function handleLogin(username) {
    fetchLogin(username)
        .then(data => {
            state.setUser(data.username);
            state.setError(null);
            return fetchWord();
        })
        .then(wordData => {
            state.setWord(wordData.storedWord);
            render(state);
        })
        .catch(err => {
            if (err.error === 'auth-insufficient') {
                state.setError('Username dog is not allowed');
            }
            render(state);
        });
}

function handleLogout() {
    fetchLogout()
        .then(() => {
            state.clearUser();
            state.setError(null);
            render(state);
        })
        .catch(err => {
            state.setError(err.error);
            render(state);
        });
}

function handleUpdateWord(newWord) {
    updateWord(newWord)
        .then(wordData => {
            state.setWord(wordData.storedWord);
            render(state);
        })
        .catch(err => {
            state.setError(err.error);
            render(state);
        });
}
