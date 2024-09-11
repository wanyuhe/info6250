
document.addEventListener('DOMContentLoaded', () => {
    const cart = {};

    document.getElementById('hide-cart').addEventListener('click', () => {
        document.getElementById('hide-cart').style.display = 'none';
        document.getElementById('cart').style.display = 'none';
        let totalItems = 0;
        Object.keys(cart).forEach((productId) => {
            const { quantity } = cart[productId];
            totalItems += quantity;
        });
        document.getElementById('count').innerText = `(${totalItems})`;
        document.getElementById('view-cart').style.display = 'block';

    });

    document.getElementById('view-cart').addEventListener('click', () => {
        const cartContainer = document.getElementById('cart');
        cartContainer.style.display = 'block';


        document.getElementById('view-cart').style.display = 'none';
        renderCart();
    });

    const updateViewCartButton = () => {
        const cartItems = getCartItems();
        let totalItems = 0;
        Object.values(cartItems).forEach(item => {
            totalItems += item.quantity;
        });
        document.getElementById('view-cart').textContent = `View Cart (${totalItems})`;
    };

    const renderCart = () => {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = '';
        let totalItems = 0;
        let cartHTML = '';
        const hideCartButton = document.getElementById('hide-cart');
        if (cartContainer.style.display === 'none') {
            hideCartButton.style.display = 'none';
        } else {
            hideCartButton.style.display = 'block';
            document.getElementById('view-cart').style.display = 'none';
        }
        Object.keys(cart).forEach((productId) => {
            const { name, price, quantity, imageUrl } = cart[productId];
            totalItems += quantity;
            cartHTML += `
                <div class="cart-item" data-id="${productId}">
                    <img src="${imageUrl}" />
                    <h4>${name}</h4>
                    
                    <p>$${price.toFixed(2)} x ${quantity} = $${(price * quantity).toFixed(2)}</p>
                    <input type="number" value="${quantity}" min="1" class="quantity-input">
                    <button class="remove-item">Remove</button>
                </div>
            `;
        });

        if (totalItems > 0) {
            cartHTML += `<button id="checkout">Checkout</button>`;
            cartContainer.innerHTML = cartHTML;
            cartContainer.style.display = 'block';
        } else {
            cartContainer.innerHTML = '<p>Nothing in the cart</p>';
        }
    };

    document.getElementById('products').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const product = event.target.closest('.product');
            const productId = product.dataset.id;
            const productName = product.querySelector('h2').innerText;
            const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));
            const imageUrl = product.querySelector('img').getAttribute('src');
            if (!cart[productId]) {
                cart[productId] = { name: productName, price: productPrice, quantity: 1, imageUrl };
            } else {
                cart[productId].quantity += 1;
            }

            renderCart();
        }
    });

    document.getElementById('cart').addEventListener('click', (event) => {
        if (event.target.id === 'checkout') {
            Object.keys(cart).forEach((productId) => {
                delete cart[productId];
            });
            renderCart();
        } else if (event.target.classList.contains('remove-item')) {
            const productId = event.target.closest('.cart-item').dataset.id;
            delete cart[productId];
            renderCart();
        }
    });

    document.getElementById('cart').addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const productId = event.target.closest('.cart-item').dataset.id;
            const newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                cart[productId].quantity = newQuantity;
            } else {
                delete cart[productId];
            }
            renderCart();
        }
    });
});
