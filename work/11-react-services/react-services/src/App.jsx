import { useEffect, useState } from 'react';
import './App.css';
import StoreWord from './StoreWord';
import Login from './Login';
import Loading from './Loading';
import { fetchSession } from './services';

function App() {
    const [loading, setLoading] = useState(false);
    
    const [userState, setUserState] = useState({
        username: '',
        isLoggedIn: false,
        error: ''
    });
    
    useEffect(() => {
            setLoading(true);
            fetchSession()
            .then(response => {
                setUserState({
                    username:response.username,
                    isLoggedIn: true,
                    error: ''
                });
            })
            .catch(err => {
                setUserState({
                    username: '',
                    isLoggedIn: false,
                    error: ''
                });
                
            })
            .finally(() => {
                setLoading(false);
            });
        },
        []);
    
    
    function onLogin(username) {
        setLoading(true);
        setUserState({
            username,
            isLoggedIn: false,
            error: ''
        })
        setLoading(false);
    }
    
    function onLogout() {
        setLoading(true);
        setUserState({
            username: '',
            isLoggedIn: false,
            error: ''
        })
        setLoading(false);
    }
    
    return (
        <div className="App">
            <h1>Word Store</h1>
            <div className='word-form'>
                {
                    userState.isLoggedIn ?
                        <StoreWord
                            setLoading={setLoading}
                            user={userState.username}
                            setUserState={setUserState}
                            onLogout={onLogout}
                        /> :
                        <Login
                            setLoading={setLoading}
                            setUserState={setUserState}
                            onLogin={onLogin}
                        />
                }
            </div>
            <div className='error'>
                {userState.error}
            </div>
            <div className='loading'>
                {loading && <Loading />}
            </div>
        </div>
    );
}

export default App;