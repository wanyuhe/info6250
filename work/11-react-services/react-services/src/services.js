export function fetchSession() {
    return fetch('/api/session')
    .catch( error => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (!response.ok) {
            return response.json().then( error => Promise.reject(error));
        }
        
        return response.json();
    })
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
            return response.json().then(response => {
                Promise.reject(response);
            });
        }
        return response.json().then(response => {
            return response;
        })
    })
}


export function performLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
};

export function retrieveStoredWord() {
    return fetch('/api/word')
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
};

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
};