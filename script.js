let cart = [];
let total = 0;

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('translate-x-full');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    // Animasi sederhana
    const btn = event.target;
    btn.innerText = "Ditambahkan!";
    setTimeout(() => btn.innerText = "+ Keranjang", 1000);
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="flex justify-between items-center border-b pb-2">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p class="text-sm text-stone-500">Rp ${item.price.toLocaleString()}</p>
                </div>
                <button onclick="removeItem(${index})" class="text-red-500 text-sm hover:underline">Hapus</button>
            </div>
        `;
    });
    
    cartCount.innerText = cart.length;
    cartTotal.innerText = `Rp ${total.toLocaleString()}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    
    let message = "Halo Bean & Brew, saya ingin memesan:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (Rp ${item.price.toLocaleString()})%0A`;
    });
    message += `%0ATotal: Rp ${total.toLocaleString()}`;
    
    // Ganti dengan nomor WhatsApp Anda
    const phoneNumber = "628123456789"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}
