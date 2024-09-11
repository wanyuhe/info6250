const express = require('express');
const {logout} = require("../model/gameLogic");
const router = express.Router();
router.post('/logout', (req, res) => {
    res.clearCookie('sid');
    const sessionId = req.cookies.sid;
    logout(sessionId)
    res.redirect('/');
});

module.exports = router;
