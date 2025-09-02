// ================== STORE.JS ==================

// ---- Sample Products ----
const products = [
  { 
    id: 1, 
    name: "Wireless Earbuds", 
    price: 1499, 
    image: "https://m.media-amazon.com/images/I/71W73DIJLUL.jpg" 
  },
  { 
    id: 2, 
    name: "Smart Watch", 
    price: 2999, 
    image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg" 
  },
  { 
    id: 3, 
    name: "Bluetooth Speaker", 
    price: 1999, 
    image: "https://mobilla.in/cdn/shop/collections/Mrock_101-1_533x.jpg?v=1702109941" 
  },
  { 
    id: 4, 
    name: "Gaming Mouse", 
    price: 999, 
    image: "https://www.jiomart.com/images/product/original/rvtrhnivcx/rpm-euro-games-usb-wireless-gaming-mouse-rechargeable-500-mah-battery-dpi-upto-3200-6-color-rgb-lights-rubber-coated-mice-black-product-images-orvtrhnivcx-p594809527-0-202210261818.jpg?im=Resize=(1000,1000)" 
  },
  { 
    id: 5, 
    name: "Laptop Backpack", 
    price: 1299, 
    image: "https://m.media-amazon.com/images/I/71dOWgXMdTL._UF1000,1000_QL80_.jpg" 
  },
  { 
    id: 6, 
    name: "Power Bank", 
    price: 899, 
    image: "https://img.freepik.com/free-vector/powerbank-battery-charger-realistic-icons-set-with-black-silver-devices-isolated-vector-illustration_1284-81780.jpg?semt=ais_hybrid&w=740&q=80" 
  }
];

let cart = [];

// ---- DOM Elements ----
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const summaryItems = document.getElementById("summary-items");
const summaryTotal = document.getElementById("summary-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");

// ---- Render Products ----
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// ---- Add to Cart ----
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const item = cart.find((c) => c.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

// ---- Remove from Cart ----
function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  renderCart();
}

// ---- Render Cart ----
function renderCart() {
  cartList.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</span>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartList.appendChild(div);
  });

  summaryItems.textContent = totalItems;
  summaryTotal.textContent = "₹" + totalPrice;
}

// ---- Clear Cart ----
clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// ---- Checkout ----
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for shopping at Sury Store!");
  cart = [];
  renderCart();
});

// ---- Contact Form ----
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    contactStatus.textContent = "Please fill all fields.";
    contactStatus.style.color = "red";
    return;
  }

  contactStatus.textContent = "Message sent successfully!";
  contactStatus.style.color = "green";
  contactForm.reset();
});

// ---- Initialize ----
renderProducts();
renderCart();
