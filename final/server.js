const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

const chatMessages = [];
const loggedInUsers = new Map();

// Check session and get user
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    
    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

// Login and create session
app.post('/api/session', (req, res) => {
    const { username } = req.body;
    if (!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    const sid = sessions.createSession(username);
    
    res.cookie('sid', sid, {httpOnly: true, sameSite: "Strict", path:"/"});
    
    loggedInUsers.set(username, true);
    
    res.json({ username });
});

// Logout and clear session
app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    
    
    if (sid) {
        res.clearCookie('sid', { path: '/' });
        sessions.deleteSession(sid);
    }
    
    if (username && !sessions.hasActiveSessions(username)) {
        loggedInUsers.delete(username);
    }
    res.json({username} );
});

// Get stored word
app.get('/api/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const storedWord = users.users[username] || "";
    res.json({ storedWord });
});

// Update stored word
app.put('/api/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { word } = req.body;

    if (!word && word !== '') {
        res.status(400).json({ error: 'required-word' });
        return;
    }
    if (!users.isValidWord(word)) {
        res.status(400).json({ error: 'invalid-word' });
        return;
    }

    users.users[username] = word;
    res.json({ word });
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
    
    const message = { username, text, timestamp: new Date() };
    chatMessages.push(message);
    res.json(message);
});

// Get logged in users
app.get('/api/users', (req, res) => {
    const userStatus = Object.fromEntries(loggedInUsers);
    res.json(userStatus);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));