import React, { useState } from 'react';
import Login from './Login';
import Game from './Game';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    
    const handleLogin = (username) => {
        setUser(username);
    };
    
    const handleLogout = () => {
        setUser(null);
    };
    
    return (
        <div className="app">
            <header className="app-header">Guess Game!</header>
            <main>
                {user ? (
                    <>
                        <header className="greeting">Hello, {user}</header>
                        <Game username={user} onLogout={handleLogout} />
                    </>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </main>
            <footer className="app-footer">
                Created by Wanyu He
            </footer>
        </div>
    );
}

export default App;

