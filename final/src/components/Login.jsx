import { useState } from 'react';

function Login({ onLogin }) {
    const [inputValue, setInputValue] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(inputValue, setInputValue)
    };
    
    return (
        <div className="login-page">
            <h2>Please Login here</h2>
            <form onSubmit={handleSubmit}>
                <input
                    maxLength={25}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Please enter your username"
                />
                <button type="submit" className='login-button'>Login</button>
            </form>
        </div>
    );
}

export default Login;