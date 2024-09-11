function homePage(sessionId, gameState, username) {
    let htmlContent;
    if (!sessionId) {
        // User not logged in, show login form
        htmlContent = `
            <!doctype html>
            <html>
            <head><title>Login</title>
            <link rel="stylesheet" type="text/css" href="css/styles.css" />
            </head>
            <body>
                <header class="login-header"><h1>Welcome to the Guessing Game</h1></header>
                <div class="form-container">
                <form action="/login" method="post">
                    <input class="login-input" type="text" name="username" placeholder="Enter username">
                    <button class="login-button" type="submit">Login</button>
                </form>
                <p class="login-reminder">Please enter a username to login</p>
                </div>
            </body>
            </html>`;
    } else {
        // User logged in, show game state
        htmlContent = `
            <!doctype html>
            <html>
            <head><title>Game Home</title>
            <link rel="stylesheet" type="text/css" href="css/styles.css" />
            </head>
            <body>
                <header><h1>Guessing Game</h1></header>
                
                <h2><p>Player: ${gameState.username}</p></h2>
                
                <div>
                <div class="heading">Word List</div>
                <ul class="list">
                ${gameState.possibleWords.map((word) => `<li>${word}</li>`).join('')}
                </ul></div>
                
                <div>
                <div class="heading">Guessed words</div>
                <ul class="list guess-list">
                 ${gameState.guesses.map(({guess, matches}) => `<li>${guess}<strong>Matching Letter: ${matches}</strong></strong></li>`).join('')}
                </ul></div>
                
                <div class="invalid-guess">${gameState.invalid ? `${gameState.invalid} is an invalid guess` : ''}</div>
                
                <form action="/guess" method="post">
                <label for="user-guess" class="guess-label">Type to guess a word</label>
                <input id="user-guess" name="guess" />
                <button type="submit">Guess</button>
                </form>
                
                <div class="game-status">${gameState.won ? 'You win! You can start a new game.' : ''}</div>
                <div class="guess-count">Guess count: ${gameState.guessCount}</div>
                
                <div class="footer">
                <form action="/new-game" method="post">
                    <button type="submit">Start New Game</button>
                </form>               
                <form action="/logout" method="post">
                    <button type="submit">Logout</button>
                </form>
                </div>
            </body>
            </html>`;
    }
    return htmlContent;

}

module.exports = homePage;
