document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        const emptyCartImage = document.createElement('img');
        emptyCartImage.src = './empty cart.png'; // Set the path to your image
        emptyCartImage.alt = 'Empty Cart'; // Set the alt text for the image
        emptyCartImage.classList.add('empty-cart-image');
        
        const message = document.createElement('p');
        message.classList.add('no-cart-items-message');
        message.textContent = 'Your cart is empty.';

        const empty_btn = document.createElement('button');
        message.classList.add('shop-btn');
        message.textContent = 'Your cart is empty.';

        cartItemsContainer.appendChild(emptyCartImage);
        cartItemsContainer.appendChild(message);
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('card'); // Use the same class as the product card
            const shortTitle = item.title.length > 20 ? `${item.title.substring(0, 15)}...` : item.title;
            
            cartItem.innerHTML = `
                <div class="cards">
                    <p class="badge">${item.badge_text}</p>
                    <div class="img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <p class="title">${shortTitle}</p>
                    <p class="vendor">${item.vendor}</p>
                    <div class="prices">
                        <p class="price g">₹${item.price}</p>
                        <p class="price r">₹${item.compare_at_price}</p>
                    </div>
                    <div class="btns">
                        <button class="remove-from-cart" data-title="${item.title}">Remove</button>
                    </div>
                </div>`;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(this.dataset.title);
            });
        });
    }

    // Function to remove item from cart
    function removeFromCart(title) {
        const updatedCart = cart.filter(item => item.title !== title);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload(); // Reload the page to update the cart display
    }
});
