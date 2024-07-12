document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards-container');
    const btnMen = document.getElementById('btn-men');
    const btnWomen = document.getElementById('btn-women');
    const btnKids = document.getElementById('btn-kids');
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

    // Function to create card HTML for a product
    function createCard(product) {
        const card = document.createElement('div');
        card.classList.add('card');

        const shortTitle = product.title.length > 20 ? `${product.title.substring(0, 15)}...` : product.title;

        card.innerHTML = `
            <div class="cards">
            <p class="badge">${product.badge_text}</p>
            <p class="title">${shortTitle}</p>
            <div class="img">
              <img src=${product.image} alt="img">
            </div>
            <p class="price">₹${product.price}</p>
            <p class="vendor">${product.vendor}</p>
            <div class="btns">
                <button class="buy">Add to Cart</button>
                <button class="buy">Buy Now</button>
            </div>
          </div>`;

        return card;
    }
});
