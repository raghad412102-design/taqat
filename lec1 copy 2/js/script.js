const cartCount = document.querySelector("#cartCount");
const summaryCount = document.querySelector("#summaryCount");
const totalPrice = document.querySelector("#totalPrice");
const clearCartBtn = document.querySelector("#clearCartBtn");
const cartItemsList = document.querySelector("#cartItemsList");
const emptyCartMessage = document.querySelector("#emptyCartMessage");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

let totalItems = 0;
let currentTotalCost = 0;

addToCartButtons.forEach((btn) => {
    btn.onclick = function () {
        const productCard = btn.closest(".product-card");
        const nameElement = productCard.querySelector(".product-name");
        const priceElement = productCard.querySelector(".product-price");
        
        const productName = nameElement.textContent;
        const priceValue = Number(priceElement.textContent) || 0;

        totalItems++;
        currentTotalCost += priceValue;

        emptyCartMessage ? emptyCartMessage.remove() : null;

        const itemRow = document.createElement("div");
        itemRow.className = "flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100 transition-all animate-fadeIn";
        itemRow.dataset.price = priceValue;
        itemRow.innerHTML = `
            <div class="flex flex-col">
                <span class="font-medium text-gray-800">${productName}</span>
                <span class="text-xs text-green-600 font-semibold">$${priceValue}</span>
            </div>
            <button class="delete-item-btn text-red-500 hover:text-red-700 transition px-1">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        itemRow.querySelector(".delete-item-btn").onclick = function () {
            totalItems--;
            currentTotalCost -= priceValue;
            itemRow.remove();
            updateTotals();
        };

        cartItemsList.appendChild(itemRow);
        updateTotals();
    };
});

function updateTotals() {
    cartCount.textContent = totalItems;
    summaryCount.textContent = totalItems;
    totalPrice.textContent = currentTotalCost;

    if (totalItems === 0 && !document.querySelector("#emptyCartMessage")) {
        cartItemsList.innerHTML = `<p id="emptyCartMessage" class="text-gray-400 text-center py-2 italic">The cart is empty</p>`;
    }

    cartCount.className = totalItems > 0 
        ? "absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow scale-110 transition duration-150" 
        : "absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow scale-100";
}

clearCartBtn.onclick = function () {
    totalItems = 0;
    currentTotalCost = 0;
    cartItemsList.innerHTML = `<p id="emptyCartMessage" class="text-gray-400 text-center py-2 italic">The cart is empty</p>`;
    updateTotals();
};