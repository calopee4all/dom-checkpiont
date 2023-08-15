const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

const items = [
    { id: 1, name: "Item 1", price: 10.99, quantity: 1 },
    { id: 2, name: "Item 2", price: 15.99, quantity: 1 },
    { id: 3, name: "Item 3", price: 5.99, quantity: 1 },
];

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="plus" data-id="${item.id}">+</button>
            <button class="heart" data-id="${item.id}">&#x2764;</button>
        `;
        total += item.price * item.quantity;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
}

updateCart();

cartItems.addEventListener("click", (event) => {
    const target = event.target;
    const itemId = parseInt(target.getAttribute("data-id"));

    if (target.classList.contains("plus")) {
        items.find((item) => item.id === itemId).quantity++;
    } else if (target.classList.contains("minus")) {
        const item = items.find((item) => item.id === itemId);
        if (item.quantity > 1) {
            item.quantity--;
        }
    } else if (target.classList.contains("heart")) {
        const item = items.find((item) => item.id === itemId);
        item.favorite = !item.favorite;
        target.classList.toggle("active", item.favorite);
    }

    updateCart();
});
