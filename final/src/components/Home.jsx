import React from "react";
import image1 from "./images/image1.jpg"
import image2 from "./images/image2.jpg"
import image3 from "./images/image3.jpg"
import './Home.css';

function Home({darkTheme, handleNavigate, username}) {
    return (
        <div className={darkTheme ? "dark": ""}>
            <div className={`home-container`}>
                
                <div className="home-title">
                    <h2>Welcome to Our Platform, {username}!</h2>
                </div>
                <div className="home-content">
                <div className='panel1'>
                    <img
                        className='panel1-image'
                        src={image1}
                        alt='Game Thumbnail'
                    />
                    <h3>WordStore Game</h3>
                    <p className="panel_text">Discover our WordStore game where you can store, update, and expand your vocabulary in a fun and engaging way.
                    </p>
                    <p>
                        Enjoy learning new words and test your vocabulary skills with our interactive challenges and quizzes.
                    </p>
                    <button
                        className='panel_button'
                        onClick={handleNavigate} href='/'
                        data-page="wordstore"
                        aria-label='Go to WordStore page'>
                        Go to Game
                    </button>
                </div>
                <div className='panel2'>
                    <img
                        className='panel2-image'
                        src={image2}
                        alt='Chat Room Image'
                    />
                    <h3>Live Chat Room</h3>
                    <p className="panel_text">
                        Connect and converse in real-time in our chat room. Engage with other users and share your thoughts and ideas instantly.
                    </p>
                    <p>
                        Chat room offers a space for lively discussions and exchange of ideas, fostering a sense of community.
                    </p>
                    <button
                        className='panel_button'
                        onClick={handleNavigate} href='/'
                        data-page="chatweb"
                        aria-label='Go to Chat Room page'>
                        Go to Chat
                    </button>
                </div>
                <div className='panel3'>
                    <img
                        className='panel3-image'
                        src={image3}
                        alt='Online Food Shop'
                    />
                    <h3>Food Shop</h3>
                    <p className="panel_text">Step into FoodShop for a culinary adventure. Explore a wide range of tantalizing flavors.
                    </p>
                    <p>
                        Discover the joy of gourmet snacks at our food shop. Connect with fellow food lovers and exchange recipes and culinary tips.
                    </p>
                    <button
                        className='panel_button'
                        onClick={handleNavigate} href='/'
                        data-page="foodshop"
                        aria-label='Go to FoodShop page'>
                        Go to Shop
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Home;