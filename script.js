document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // "Acquista Ora" Button Logic
    const buyBtn = document.getElementById('buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            const setSection = document.getElementById('set');
            if (setSection) {
                setSection.scrollIntoView({ behavior: 'smooth' });
                // Optional: Highlight the section temporarily
                setSection.style.transition = 'box-shadow 0.5s';
                setSection.style.boxShadow = '0 0 30px #5ec5d9';
                setTimeout(() => {
                    setSection.style.boxShadow = 'none';
                }, 1000);
            }
        });
    }

    // Cart functionality
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || { quantity: 0 };
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart() {
        const cart = getCart();
        cart.quantity += 1;
        saveCart(cart);
        alert('Set aggiunto al carrello!');
        // Optionally redirect to cart
        window.location.href = 'carrello.html';
    }

    function updateCartDisplay() {
        const cart = getCart();
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');
        if (cartItems && cartTotal) {
            if (cart.quantity > 0) {
                cartItems.innerHTML = `
                    <div class="cart-item">
                        <img src="/Landing_Page/Sito web/Immagini/il-set.png" alt="Blue-Eyes Fan Box Set">
                        <div class="cart-item-details">
                            <h3>BLUE-EYES FAN BOX SET</h3>
                            <p>Il set completo include tappetino, statua e carte esclusive.</p>
                            <div class="quantity-controls">
                                <button class="qty-btn" onclick="changeQuantity(-1)">-</button>
                                <span class="quantity">${cart.quantity}</span>
                                <button class="qty-btn" onclick="changeQuantity(1)">+</button>
                            </div>
                        </div>
                        <div class="cart-item-price">150€</div>
                    </div>
                `;
                cartTotal.innerHTML = `Totale: ${cart.quantity * 150}€`;
            } else {
                cartItems.innerHTML = '<p>Il carrello è vuoto.</p>';
                cartTotal.innerHTML = 'Totale: 0€';
            }
        }
    }

    window.addToCart = addToCart;
    window.changeQuantity = function(delta) {
        const cart = getCart();
        cart.quantity += delta;
        if (cart.quantity < 0) cart.quantity = 0;
        saveCart(cart);
        updateCartDisplay();
    };

    // Update cart display on cart page
    if (window.location.pathname.includes('carrello.html')) {
        updateCartDisplay();
    }

    // Cart Icon Interaction
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'carrello.html';
        });
    }

    // Image Modal Interaction
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    // Add click handlers to all product card images
    document.querySelectorAll('.crop-container img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking the close button
    modalClose.addEventListener('click', () => {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the image
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Optional: Add scroll animation for elements appearing
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .banner-promo, .video-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for visible state
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
