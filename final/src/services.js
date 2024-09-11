export function fetchSession() {
    return fetch('/api/session', {
        method: 'GET',
        credentials: 'include'
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}

export function fetchLogin(username) {
    return fetch('/api/session/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
    .catch((err) => Promise.reject({ error: 'network-error'}))
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorResponse => {
                throw errorResponse;
            });
        }
        return response.json();
    });
}

export function fetchUsers() {
    return fetch("/api/users", {
        method: "GET",
    })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function performLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

//refresh Messages
export function fetchMessages() {
    return fetch('/api/messages')
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function sendMessage(message) {
    return fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function retrieveStoredWord() {
    return fetch('/api/word')
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}

export function updateStoredWord(word) {
    return fetch('/api/word', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}