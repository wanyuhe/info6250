const users = {};

function isValidUsername(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function isValidWord(word) {
    let isValid = true;
    isValid = isValid && word.match(/^[A-Za-z]*$/);
    return isValid;
}

module.exports = { isValidUsername, isValidWord, users};