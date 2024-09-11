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
}

function deleteSession(sid) {
    delete sessions[sid]
};

function getSessions () {
    return sessions;
}

function hasActiveSessions(username) {
    return Object.values(sessions).some(session => session.username === username);
}

module.exports = {
    createSession,
    getSessionUser,
    deleteSession,
    getSessions,
    hasActiveSessions
};