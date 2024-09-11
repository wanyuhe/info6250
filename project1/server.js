const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const guessRoute = require('./routes/guess');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const newGameRoute = require('./routes/new_game');
const homeRoute = require('./routes/homeRoute')

app.use(guessRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(newGameRoute);
app.use(homeRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));