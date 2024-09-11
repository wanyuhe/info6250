const uuid = require('uuid').v4;

const sessions = {};

function createSession(username){
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
};

function endSession(sid) {
    delete sessions[sid];
};

module.exports = { createSession, getSessionUser, endSession,};