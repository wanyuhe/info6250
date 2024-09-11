import React, { useState } from 'react';
import { compareWords } from './CompareWord';

function Game({ username, onLogout }) {
    const [word, setWord] = useState('');
    const [message, setMessage] = useState('');
    const secretWord = 'RECAT';
    
    const handleChange = (event) => {
        setWord(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (word.length !== 5) {
            setMessage(`${word} is not a valid word.`);
        } else {
            const commonLettersCount = compareWords(word, secretWord);
            if (word.toUpperCase() === secretWord) {
                setMessage(`${word} is the secret word!`);
            } else {
                setMessage(`${word} had ${commonLettersCount} letters in common.`);
            }
        }
        setWord('');
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="word">Enter a 5 letter word:</label>
                <input
                    id="word"
                    type="text"
                    value={word}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Game;
