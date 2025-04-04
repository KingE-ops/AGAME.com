
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
       el: '.swiper-pagination',
       clickable: true,
       dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0: {
        slidesPerview: 1

      },
      
    //   620: {
    //     slidesPerView: 2

    //   },
    //   1024: {
    //     slidesPerView: 3

    //   },

    }
  });

  class Cart {
    constructor() {
      this.items = [];
      this.taxRate = 0.08; // 8% tax
    }
  
    addItem(name, price) {
      let item = this.items.find(i => i.name === name);
      if (item) {
        item.quantity++;
      } else {
        this.items.push({ name, price, quantity: 1 });
      }
      this.render();
    }
  
    removeItem(name) {
      this.items = this.items.filter(i => i.name !== name);
      this.render();
    }
  
    updateQuantity(name, quantity) {
      let item = this.items.find(i => i.name === name);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      this.render();
    }
  
    calculateSubtotal() {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  
    calculateTax(subtotal) {
      return subtotal * this.taxRate;
    }
  
    calculateFinalTotal() {
      const subtotal = this.calculateSubtotal();
      return subtotal + this.calculateTax(subtotal);
    }
  
    calculateTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    render() {
      const cartDiv = document.getElementById('cart');
      cartDiv.innerHTML = this.items.length
        ? this.items
            .map(item => `
          <div class="cart-item">
            <span>${item.name} ($${item.price}) x ${item.quantity}</span>
            <div class="buttons">
              <button class="quantity-btn" onclick="cart.updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
              <button class="quantity-btn" onclick="cart.updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
              <button class="remove" onclick="cart.removeItem('${item.name}')">Remove</button>
            </div>
          </div>
        `)
            .join('')
        : '<p>Your cart is empty.</p>';
  
      // Update cart icon with total items
      document.getElementById('cartTotal').innerText = this.calculateTotalItems();
  
      // Update price summary
      const subtotal = this.calculateSubtotal();
      const tax = this.calculateTax(subtotal);
      const finalTotal = this.calculateFinalTotal();
      document.getElementById('subtotal').innerText = 'Subtotal: $' + subtotal.toFixed(2);
      document.getElementById('tax').innerText = 'Tax (8%): $' + tax.toFixed(2);
      document.getElementById('finalTotal').innerText = 'Total: $' + finalTotal.toFixed(2);
    }
  }
  
  // Toggle sidebar cart display
  function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar.style.display === 'none' || cartSidebar.style.display === '') {
      cartSidebar.style.display = 'block';
      setTimeout(() => {
        cartSidebar.classList.add('open');
      }, 10);
    } else {
      cartSidebar.classList.remove('open');
      setTimeout(() => {
        cartSidebar.style.display = 'none';
      }, 300);
    }
  }
  
  // Initialize Cart instance
  const cart = new Cart();
  
alert('Welcome')