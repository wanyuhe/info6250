const words = require('./words.js');

let gameSessions = {};
let gameState = {};


function startNewGame(username) {
    const secretWord = words[Math.floor(Math.random() * words.length)];
    gameState[username] = { username, secretWord, guesses: [], guessCount: 0, possibleWords: words };
    console.log(`New game started for ${username}. Secret word: ${secretWord}`);
    return gameState[username];
}

function isValidGuess(username, guess) {
    const normalizedGuess = guess.toLowerCase();
    const guessRecord = gameState[username].guesses.map(guessInfo => guessInfo.guess);
    return words.includes(normalizedGuess) && !guessRecord.includes(normalizedGuess);
}

function recordInvalidGuess(username, guess) {
    gameState[username].invalid = guess;
}

function compare( word, guess ) {
    const wordUpper = word.toUpperCase();
    const guessUpper = guess.toUpperCase();
    let commonLetters = 0;
    const wordLetterCounts = {};

    // Count the occurrences of each letter in the original word
    for (const letter of wordUpper) {
        if (!wordLetterCounts[letter]) {
            wordLetterCounts[letter] = 0;
        }
        wordLetterCounts[letter]++;
    }

    // Compare with the guessed word
    for (const letter of guessUpper) {
        if (wordLetterCounts[letter] && wordLetterCounts[letter] > 0) {
            wordLetterCounts[letter]--;
            commonLetters++;
        }
    }

    return commonLetters;


}

function compareAndRecordGuess(username, guess) {
    gameState[username].invalid = '';
    if (gameState[username].secretWord === guess) {
        gameState[username].won = true;
    }

    const matched = compare(gameState[username].secretWord, guess);

    gameState[username].guesses.push({ guess, matches: matched });
    gameState[username].guessCount++;
}

function getUsernameBySessionId(sessionId) {
    return gameSessions[sessionId];
}

function logout(sessionId) {
    delete gameSessions[sessionId]
}

function setUsernameBySessionId(sessionId, username) {
    gameSessions[sessionId] = username;
}

function getGameState(username) {
if (gameState[username]) {
return gameState[username];

    } else  {
return startNewGame(username);
}}

module.exports = {
    startNewGame,
    isValidGuess,
    recordInvalidGuess,
    compareAndRecordGuess,
    getUsernameBySessionId,
    setUsernameBySessionId,
    getGameState,
    logout,
};


