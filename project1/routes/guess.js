const express = require('express');
const router = express.Router();
const gameLogic = require('../model/gameLogic');
router.post('/guess', (req, res) => {
    const sessionId = req.cookies.sid;
    const username = gameLogic.getUsernameBySessionId(sessionId);
    if (sessionId && username) {
        const { guess } = req.body;

        if (sessionId && username) {
            const { guess } = req.body;

            if (!gameLogic.isValidGuess(username, guess)) {
                gameLogic.recordInvalidGuess(username, guess);
            } else {
                gameLogic.compareAndRecordGuess(username, guess);
            }

            res.redirect('/');
        } else {
            res.send('Please Login first to start a game.');
        }

    }

});

module.exports = router;
