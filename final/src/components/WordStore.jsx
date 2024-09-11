import { useEffect, useState } from 'react';
import { retrieveStoredWord, updateStoredWord, performLogout } from '../services';
import { MESSAGES } from '../constants';
import { actionTypes } from "../Reducer";

function WordStore({ setLoading, user, dispatch, onLogout }) {
    const [inputValue, setInputValue] = useState('');
    const [wordResult, setWordResult] = useState('')
    
    const setUserState = (obj) => {
        dispatch({
            type: actionTypes.SET,
            payload: obj,
        });
    }
    
    useEffect(() => {
            retrieveStoredWord()
            .then(response => {
                const storedWord = '' || response.storedWord;
                setWordResult(storedWord)
            })
            .catch(err => {
                setUserState({
                    username: user,
                    isLoggedIn: true,
                    error: MESSAGES[err.error]
                })
            });
        },
        []
    );
    
    return (
        <div className="wordstore-page">
            <div className="wordstore-title">
                <h2>Welcome to start game!</h2>
            </div>
            
            <div className='username'>{user}</div>
            
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    setLoading(true)
                    updateStoredWord(inputValue)
                    .then(response => {
                        setWordResult(response.word)
                        setUserState({
                            username: user,
                            isLoggedIn: true,
                            error: ''
                        })
                        setLoading(false)
                    })
                    .catch(err => {
                        setUserState({
                            username: user,
                            isLoggedIn: true,
                            error: MESSAGES[err.error]
                        })
                        setLoading(false);
                        setInputValue('')
                    });
                }}
            >
                <div className='word'>Stored Word: {wordResult}</div>
                
                <input
                    maxLength={25}
                    value={inputValue}
                    onInput={(e) => setInputValue(e.target.value)}
                    placeholder='Please enter a word'
                />
                <button>Submit</button>
                <button
                    onClick={() => {
                        setLoading(true)
                        onLogout();
                        setUserState({
                            username: '',
                            isLoggedIn: false,
                            error: ''
                        })
                        setLoading(false);
                        setInputValue('')
                    }}
                    className='logout-button'
                >Logout</button>
            </form>
        
        </div>
    );
}

export default WordStore;