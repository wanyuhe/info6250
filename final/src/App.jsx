import React, { useEffect, useState, useReducer } from "react";
import "./App.css";

import Login from "./components/Login";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import Home from "./components/Home";
import WordStore from "./components/WordStore";
import ChatWeb from "./components/ChatWeb";
import FoodShop from "./components/FoodShop";
import { fetchSession, performLogout, fetchLogin } from "./services";
import { reducer, initialState, actionTypes } from "./Reducer";
import { MESSAGES } from './constants';

function App() {
    const [userState, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState("home");
    const [darkTheme, setDarkTheme] = useState(false);
    
    const setUserState = (obj) => {
        dispatch({
            type: actionTypes.SET,
            payload: obj,
        });
    }
    
    useEffect(() => {
        setLoading(true);
        fetchSession()
        .then((response) => {
            setUserState({
                username: response.username,
                isLoggedIn: true,
                error: ""
            })
        })
        .catch((err) => {
            setUserState({
                username: "",
                isLoggedIn: false,
                error: MESSAGES[err.error],
            })
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
    
    function onLogin(username, setInputValue) {
        setLoading(true);
        fetchLogin(username)
        .then((response) => {
            setUserState({
                username: response.username,
                isLoggedIn: true,
                error: null,
            })
        })
        .catch((err) => {
            setUserState({
                username: "",
                isLoggedIn: false,
                error: MESSAGES[err.error],
            })
            setInputValue("");
        })
        .finally(() => {
            setLoading(false);
        });
    }
    
    function onLogout() {
        setLoading(true);
        performLogout()
        .then(() => {
            dispatch({
                type: actionTypes.SET,
                payload: {
                    username: "",
                    isLoggedIn: false,
                    error: "",
                },
            });
        })
        .catch(err => {
            console.error('Error logOut messages:', err);
        })
        .finally(() => {
            setLoading(false);
        });
    }
    
    const login = (username) => {
        dispatch({ type: actionTypes.LOGIN, payload: { username } });
    };
    
    const logout = () => {
        dispatch({ type: actionTypes.LOGOUT });
    };
    
    const [historyStack, setHistoryStack] = useState(["home"]);
    
    useEffect(() => {
        const handlePopState = (e) => {
            if (historyStack.length > 1) {
                const newStack = historyStack.slice(0, -1);
                setHistoryStack(newStack);
                setPage(newStack[newStack.length - 1]);
            }
        };
        
        window.addEventListener("popstate", handlePopState);
        
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [historyStack]);
    
    const handleNavigate = (e) => {
        const newPage = e.target.getAttribute("data-page");
        if (newPage) {
            setPage(newPage);
            setHistoryStack((prevStack) => [...prevStack, newPage]);
            window.history.pushState(null, "", "#" + newPage);
        }
    };
    
    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };
    
    return (
        <div className={`App ${darkTheme ? "dark" : ""}`}>
            <header>
                <h1>Recreation Center</h1>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </header>
            
            <Nav isLoggedIn={userState.isLoggedIn} handleNavigate={handleNavigate} />
            
            <main className={`main-content ${darkTheme ? "dark" : ""}`}>
                {userState.isLoggedIn ? (
                    <>
                        {page === "home" && (
                            <Home
                                darkTheme={darkTheme}
                                handleNavigate={handleNavigate}
                                username={userState.username}
                            />
                        )}
                        {page === "wordstore" && (
                            <WordStore
                                setLoading={setLoading}
                                user={userState.username}
                                dispatch={dispatch}
                                onLogout={onLogout}
                            />
                        )}
                        {page === "chatweb" && (
                            <ChatWeb
                                username={userState.username}
                                messages={[]}
                                users={[]}
                                onLogout={onLogout}
                            />
                        )}
                        {page === "foodshop" && (
                            <FoodShop
                                username={userState.username}
                                onLogout={onLogout} />
                        )}
                    </>
                ) : (
                    <Login
                        onLogin={onLogin}
                    />
                )}
                <div className="error">{userState.error}</div>
                <div className="loading">{loading && <Loading />}</div>
            </main>
            
            <footer>
                <div className="left-footer">
                    <p>2151 Oakland Rd, CA 95131</p>
                    <p>+1-408-914-0023</p>
                    <a href="he.wany@northeastern.edu">he.wany@northeastern.edu</a>
                </div>
                <div className="right-footer">
                    <p>© 2024 Recreation Center - All rights reserved</p>
                </div>
            </footer>
        </div>
    );
}

export default App;