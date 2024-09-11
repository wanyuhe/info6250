export function fetchSession() {
    return fetch('/api/session', {
        method: 'GET',
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

export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
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

export function fetchLogout() {
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
