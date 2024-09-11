const express = require('express');
const router = express.Router();
const homePage = require('../views/home');
const gameLogic = require('../model/gameLogic');

function isLoggedIn(req) {
    const sessionId = req.cookies.sid;
    if (!sessionId) return false;
    return gameLogic.getUsernameBySessionId(sessionId) != null;
}

function getGameState(username) {
    return gameLogic.getGameState(username);
}

router.get('/', (req, res) => {
    const sessionId = req.cookies.sid;
    if (!isLoggedIn(req)) {
    res.send(homePage(null, null));
    return;
    }

const username = gameLogic.getUsernameBySessionId(sessionId);
const gameState = getGameState(username);

    res.send(homePage(username, gameState, username));
});

module.exports = router;

