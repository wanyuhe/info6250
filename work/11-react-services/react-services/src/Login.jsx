import { useState } from 'react';
import { fetchLogin } from './services';
import { MESSAGES } from './constants';

function Login({ setLoading, setUserState, onLogin }) {
    const [inputValue, setInputValue] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        fetchLogin(inputValue)
        .then(response => {
            setUserState({
                username: response.username,
                isLoggedIn: true,
                error: null
            });
            setLoading(false);
        })
        .catch(err => {
            setUserState({
                username: '',
                isLoggedIn: false,
                error: MESSAGES[err.error]
            });
            setLoading(false);
            setInputValue('');
        })
    };
    
    return (
        <div className="login-page">
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