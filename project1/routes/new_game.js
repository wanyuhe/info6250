const express = require('express');
const router = express.Router();
const gameLogic = require('../model/gameLogic');
const {getUsernameBySessionId} = require("../model/gameLogic");

router.post('/new-game', (req, res) => {
    const sessionId = req.cookies.sid;
    const username = getUsernameBySessionId(sessionId)
    if (sessionId) {
        gameLogic.startNewGame(username);
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;

