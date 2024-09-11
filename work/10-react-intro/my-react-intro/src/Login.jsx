import React, { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    
    const getIsValid = (username) => {
        return /^[A-Za-z0-9_]+$/.test(username) && username.toLowerCase() !== 'dog';
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = getIsValid(username);
        setIsNameValid(isValid);
        
        if (isValid) {
            onLogin(username);
        }
    };
    
    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login-form">
                {!isNameValid && <p className="alert">Username is not valid or is not allowed.</p>}
                <label className="form-label">
                    Username:
                    <input
                        className="login-username"
                        placeholder="Please enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <button type="submit" className="form-btn">Login</button>
            </form>
        </div>
    );
}

export default Login;
