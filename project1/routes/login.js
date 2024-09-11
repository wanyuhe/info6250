const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const gameLogic = require('../model/gameLogic');
const {setUsernameBySessionId} = require("../model/gameLogic");

const validCharacters = /^[a-zA-Z0-9]+$/;

router.post('/login', (req, res) => {
    const username = req.body.username.trim();
    if (username.toLowerCase() === "dog" || !validCharacters.test(username)) {
        return res.status(400).send("Invalid username. Please try a different one.");
    }

    const sessionId = uuidv4();

    res.cookie('sid', sessionId, { httpOnly: true, sameSite: 'lax' });
    setUsernameBySessionId(sessionId, username)
    res.redirect('/');
});

module.exports = router;
