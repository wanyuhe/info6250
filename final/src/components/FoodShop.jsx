import React, { useState, useEffect } from 'react';
import image4 from "./images/image4.jpg"
import image5 from "./images/image5.jpg"
import image6 from "./images/image6.jpg"
import './FoodShop.css';

function FoodShop({ username, onLogout }) {
    const [cart, setCart] = useState({});
    const [showCart, setShowCart] = useState(false);
    
    const products = [
        { id: 1, name: 'Product 1', price: 1.99, image: image4 },
        { id: 2, name: 'Product 2', price: 2.99, image: image5 },
        { id: 3, name: 'Product 3', price: 3.99, image: image6 }
    ];
    
    const addToCart = (product) => {
        setCart(prevCart => ({
            ...prevCart,
            [product.id]: prevCart[product.id]
                ? { ...prevCart[product.id], quantity: prevCart[product.id].quantity + 1 }
                : { ...product, quantity: 1 }
        }));
    };
    
    const removeFromCart = (productId) => {
        const updatedCart = { ...cart };
        delete updatedCart[productId];
        setCart(updatedCart);
    };
    
    const updateQuantity = (productId, quantity) => {
        setCart(prevCart => ({
            ...prevCart,
            [productId]: { ...prevCart[productId], quantity }
        }));
    };
    
    const [totalItems, setTotalItems] = useState(0);
    
    useEffect(() => {
        setTotalItems(getTotalItemsInCart());
    }, [cart]);
    
    const getTotalItemsInCart = () => {
        return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    };
    
    
    const checkout = () => {
        setCart({});
    };
    
    const renderCart = () => {
        const entries = Object.entries(cart);
        return entries.length > 0 ? (
            <div>
                {entries.map(([productId, { name, price, quantity, image }]) => (
                    <div key={productId} className="cart-item">
                        <img src={image} alt={name} />
                        <h4>{name}</h4>
                        <p>${price.toFixed(2)} x {quantity} = ${(price * quantity).toFixed(2)}</p>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => updateQuantity(productId, parseInt(e.target.value))}
                            className="quantity-input"
                        />
                        <button onClick={() => removeFromCart(productId)}>Remove</button>
                    </div>
                ))}
                <button onClick={checkout}>Checkout</button>
            </div>
        ) : <p>Nothing in the cart</p>;
    };
    
    return (
        <div className="foodshop">
            <h2>Welcome to Food Shop, {username}!</h2>
            <div id="products">
                {products.map(product => (
                    <div key={product.id} className="product" data-id={product.id}>
                        <img src={product.image} alt={`Product ${product.id}`} />
                        <h2>{product.name}</h2>
                        <p>${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="action-buttons">
            {showCart ? (
                <>
                    <button className="action-button" onClick={() => setShowCart(false)}>Hide Cart</button>
                    <div id="cart">{renderCart()}</div>
                </>
            ) : (
                <button className="action-button" onClick={() => setShowCart(true)}>View Cart ({totalItems})</button>
            )}
            <button className="logout-button action-logout-button" onClick={onLogout}>Logout</button>
            </div>
            </div>
    );
}

export default FoodShop;

