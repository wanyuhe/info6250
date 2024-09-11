const express = require('express');
const cookieParser = require('cookie-parser');

const sessions = require('./sessions');
const users = require('./users');

const app = express();
const PORT = 3000;

const chatMessages = [];
const loggedInUsers = new Set();

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.json());

// validate session
app.use('/api', (req, res, next) => {
    if (req.path === '/session' && req.method === 'GET') {
        return next();
    }
    if (req.path === '/session' && req.method === 'POST') {
        return next();
    }

    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (sid && username) {
        req.username = username;
        next();
    } else {
        res.status(401).json({ error: 'Session invalid or expired' });
    }
});


//Check for existing session
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    console.log("check session" + sid, username)
    
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

// Create a new session (login)
app.post('/api/session', (req, res) => {
    const { username } = req.body;
    if(!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);

    res.cookie('sid', sid);
    loggedInUsers.add(username);
    res.json({ username });
});

// Delete a session (logout)
app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(sid) {
        res.clearCookie('sid');
        sessions.deleteSession(sid);
    }
    if(username && !sessions.hasActiveSessions(username)) {
        loggedInUsers.delete(username);
    }
    res.json({ wasLoggedIn: !!username });
});

// Get chat messages
app.get('/api/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    const users = sessions.getSessions() || {};

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({chatMessages, users});
});

// Add a chat message
app.post('/api/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { text } = req.body;
    if (typeof text !== 'string' || !text.trim()) {
        res.status(400).json({ error: 'invalid-message' });
        return;
    }

    const message = { username: req.username, text, timestamp: new Date() };
    chatMessages.push(message);
    res.json(message);
});

// Get logged in users
app.get('/api/users', (req, res) => {
    res.json([...loggedInUsers]);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
