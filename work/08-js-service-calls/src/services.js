export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
      .catch(err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
      });
}

export function checkSession() {
    return fetch('/api/session', {
        method: 'GET',
        credentials: 'include',
    })
        .catch(() => Promise.reject({ error: 'network-error' })) // Handles network errors
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    // User not logged in
                    return response.json().then( info => Promise.reject(info) );
                }
                // Other errors
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
    credentials: 'include',
  })
      .catch(err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
          return Promise.reject({ error: 'logout-failed' });
        }
        return response.json();
      });
}

export function fetchWord() {
  return fetch('/api/word', {
    method: 'GET',
    credentials: 'include',
  })
      .catch(err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
      });
}

export function updateWord(newWord) {
  return fetch('/api/word', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word: newWord }),
  })
      .catch(err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
      });
}

