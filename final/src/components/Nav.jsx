function Nav({ isLoggedIn, handleNavigate }) {
    return (
        <nav onClick={handleNavigate}>
            {isLoggedIn && (
                <>
                    <button data-page="home">Home</button>
                    <button data-page="wordstore">WordStore</button>
                    <button data-page="chatweb">Chat Room</button>
                    <button data-page="foodshop">Food Shop</button>
                </>
            )}
        </nav>
    );
}

export default Nav;
