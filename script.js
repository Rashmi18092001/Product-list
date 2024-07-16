document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards-container');
    const btnMen = document.getElementById('btn-men');
    const btnWomen = document.getElementById('btn-women');
    const btnKids = document.getElementById('btn-kids');
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    const cartContainerIcon = document.querySelector('.cart-container');
    let productsData = []; // To store all products data initially

    // Fetch data from API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            productsData = data.categories; // Store products data

            // Display all products initially
            displayProducts(productsData);

            // Filter products on button click
            btnMen.addEventListener('click', function() {
                filterProducts('Men');
            });

            btnWomen.addEventListener('click', function() {
                filterProducts('Women');
            });

            btnKids.addEventListener('click', function() {
                filterProducts('Kids');
            });

            // Search functionality
            searchBtn.addEventListener('click', function() {
                const searchTerm = searchInput.value.trim().toLowerCase();
                searchProducts(searchTerm);
            });

            // Trigger search on "Enter" key press
            searchInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const searchTerm = searchInput.value.trim().toLowerCase();
                    searchProducts(searchTerm);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to display products based on categories
    function displayProducts(categories) {
        cardsContainer.innerHTML = ''; // Clear existing cards

        categories.forEach(category => {
            category.category_products.forEach(product => {
                const card = createCard(product);
                cardsContainer.appendChild(card);
            });
        });
    }

    // Function to filter products based on category name
    function filterProducts(categoryName) {
        const filteredProducts = productsData.find(category => category.category_name === categoryName);
        if (filteredProducts) {
            displayProducts([filteredProducts]);
        } else {
            console.log(`No products found for category: ${categoryName}`);
        }
    }

    // Function to search products based on input value
    function searchProducts(searchTerm) {
        if (!searchTerm) {
            displayProducts(productsData); // If search term is empty, display all products
            return;
        }

        const filteredCategories = productsData.map(category => {
            const filteredProducts = category.category_products.filter(product => {
                return product.title.toLowerCase().includes(searchTerm) || 
                       product.vendor.toLowerCase().includes(searchTerm) || 
                       category.category_name.toLowerCase() === searchTerm ||
                       (product.badge_text && product.badge_text.toLowerCase().includes(searchTerm));
            });
            return { ...category, category_products: filteredProducts };
        }).filter(category => category.category_products.length > 0);

        if (filteredCategories.length > 0) {
            displayProducts(filteredCategories);
        } else {
            displayNoProductsMessage();
        }
    }

    // Function to create card HTML for a product
    function createCard(product) {
        const card = document.createElement('div');
        card.classList.add('card');

        const shortTitle = product.title.length > 20 ? `${product.title.substring(0, 15)}...` : product.title;

        card.innerHTML = `
        <div class="cards">
            <p class="badge">${product.badge_text}</p>
            <div class="img">
                <img src=${product.image} alt="img">
            </div>
            <p class="title">${shortTitle}</p>
            <p class="vendor">${product.vendor}</p>
            <div class="prices">
                <p class="price g">₹${product.price}</p>
                <p class="price r">₹${product.compare_at_price}</p>
            </div>
            <div class="btns">
                <button class="add-to-cart">Add to Cart</button>
                <button class="buy">Buy Now</button>
            </div>
        </div>`;

        // Add event listener to "Add to Cart" button
        card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));

        return card;
    }

    // Function to add product to cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product added to cart:', product);
        alert('Product added to cart');
    }

    // Redirect to cart page on cart icon click
    cartContainerIcon.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    // Function to display a message when no products are found
    function displayNoProductsMessage() {
        cardsContainer.innerHTML = ''; // Clear existing cards
        const message = document.createElement('p');
        message.classList.add('no-products-message');
        message.textContent = 'No products found for the given search term.';
        cardsContainer.appendChild(message);
    }
});
