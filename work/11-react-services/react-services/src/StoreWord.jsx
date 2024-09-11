import { useEffect, useState } from 'react';
import { retrieveStoredWord, updateStoredWord, performLogout } from './services';
import { MESSAGES } from './constants';

function StoreWord({ setLoading, user,setUserState, onLogout }) {
    const [inputValue, setInputValue] = useState('');
    const [wordResult, setWordResult] = useState('')
    
    useEffect(() => {
            setLoading(true);
            retrieveStoredWord()
            .then( response => {
                const storedWord = '' || response.storedWord;
                setWordResult(storedWord);
                setLoading(false);
            })
            .catch( err => {
                setUserState({
                    username: user,
                    isLoggedIn: true,
                    error: MESSAGES[err.error]
                })
                setLoading(false);
                setInputValue('');
            })
        },
        []
    );
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        
        updateStoredWord(inputValue)
        .then(response => {
            setWordResult(response.word)
            setUserState({
                username: user,
                isLoggedIn: true,
                error: ''
            })
            setLoading(false);
        })
        .catch(err => {
            setUserState({
                username: user,
                isLoggedIn: true,
                error: MESSAGES[err.error]
            })
            setLoading(false);
            setInputValue('')
        })
    };
    
    const handleLogout = () => {
        setLoading(true);
        performLogout()
        .finally(() => {
            onLogout();
            setLoading(false);
        });
    };
    
    return (
        <div className="user">
            <div className='username'>{user}</div>
            
            <form onSubmit={handleSubmit}>
                <div className='word'>Stored Word: {wordResult}</div>
                
                <input
                    maxLength={25}
                    value={inputValue}
                    onInput={(e) => setInputValue(e.target.value)}
                    placeholder='Please enter a word'
                />
                <button type={"submit"}>Submit</button>
                <button
                    type="button"
                    onClick={handleLogout}
                    className='logout-button'
                >Logout</button>
            </form>
        
        </div>
    );
}

export default StoreWord;