let cart = [];
let total = 0;

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('translate-x-full');
}

function addToCart(name, price) {
    // Mengecek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        // Jika sudah ada, tambah jumlahnya
        existingItem.quantity += 1;
    } else {
        // Jika belum ada, masukkan sebagai produk baru dengan quantity 1
        cart.push({ name, price, quantity: 1 });
    }
    
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
    let totalItems = 0; // Untuk menghitung total seluruh barang (bukan hanya jenisnya)
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;
        
        // Menambahkan tombol + dan - serta menampilkan subtotal per item
        cartItems.innerHTML += `
            <div class="flex flex-col border-b pb-3 mb-3">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="font-medium">${item.name}</p>
                        <p class="text-sm text-stone-500">Rp ${item.price.toLocaleString()}</p>
                    </div>
                    <button onclick="removeItem(${index})" class="text-red-500 text-sm hover:underline">Hapus</button>
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2 border rounded-md px-2 py-1">
                        <button onclick="changeQuantity(${index}, -1)" class="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:text-black">-</button>
                        <span class="w-6 text-center text-sm font-medium">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" class="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:text-black">+</button>
                    </div>
                    <p class="font-semibold text-sm">Rp ${itemTotal.toLocaleString()}</p>
                </div>
            </div>
        `;
    });
    
    // Update badge keranjang dengan total kuantitas barang
    cartCount.innerText = totalItems;
    cartTotal.innerText = `Rp ${total.toLocaleString()}`;
}

// Fungsi baru untuk mengubah jumlah barang
function changeQuantity(index, change) {
    cart[index].quantity += change;
    
    // Jika kuantitas menjadi 0 atau kurang, hapus produk dari keranjang
    if (cart[index].quantity <= 0) {
        removeItem(index);
    } else {
        updateCartUI();
    }
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
        // Menambahkan kuantitas (misal: 2x Kopi Hitam) dan subtotal di pesan WhatsApp
        message += `- ${item.quantity}x ${item.name} (Rp ${(item.price * item.quantity).toLocaleString()})%0A`;
    });
    message += `%0ATotal: Rp ${total.toLocaleString()}`;
    
    const phoneNumber = "6282244537515"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}
