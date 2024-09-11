import React, { useState, useEffect } from 'react';
import { fetchMessages, sendMessage, fetchUsers } from '../services';
import './Chatweb.css';
import { MESSAGES } from '../constants';

function ChatWeb({username, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    useEffect(() => {
        //load messages
        const loadChatData = () => {
            fetchMessages()
            .then(messagesData => {
                if (messagesData.chatMessages && Array.isArray(messagesData.chatMessages)) {
                    setMessages(messagesData.chatMessages);
                } else {
                    setMessages([]);
                }
            })
            .catch(err => {
                console.error('Error fetching messages:', err);
            });
        };
        
        
        //load users
        const loadUsers = () => {
            fetchUsers()
            .then(usersData => {
                if (typeof usersData === 'object' && usersData !== null) {
                    const usersArray = Object.keys(usersData).map(key => ({
                        username: key
                    }));
                    setUsers(usersArray);
                } else {
                    setUsers([]);
                }
            })
            .catch(err => {
                console.error('Error fetching users:', err);
            });
        };
        
        //Polling every 5s
        loadChatData();
        loadUsers();
        const intervalMessages = setInterval(loadChatData, 5000);
        const intervalUsers = setInterval(loadUsers, 5000);
        
        return () => {
            clearInterval(intervalMessages);
            clearInterval(intervalUsers);
        };
    }, []);
    
    
    //send messages
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            try {
                const message = await sendMessage({ text: newMessage, username});
                setMessages(prevMessages => [...prevMessages, message]);
                setNewMessage('');
            } catch (err) {
                console.error('Error sending message:', err);
            }
        }
    };
    
    return (
        <div className="chat-container">
            <h2>Welcome to communicate here, {username}!</h2>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.username}</strong>: {msg.text}
                        <small>{new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <div className="user-list">
                <h3>Online Users</h3>
                {users.map((user, index) => (
                    <div key={index}>{user.username}</div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit">Send</button>
            </form>
            <button onClick={onLogout} className="logout-button chat-logout-button">Logout</button>
        </div>
    );
}

export default ChatWeb;
