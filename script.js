
const myDishes = [
    { "name": "Cheeseburger", "price": 12.99, "description": "Käseburger", "category": "Burger & Sandwiches" },
    { "name": "BBQ Bacon Burger", "price": 15.99, "description": "Burger mit BBQ", "category": "Burger & Sandwiches" },
    { "name": "V-Burger", "price": 9.99, "description": "Veganer gehts nicht", "category": "Burger & Sandwiches" },
    { "name": "Pizza Margherita", "price": 11.90, "description": "Tomaten, Mozzarella, Basilikum", "category": "Pizza" },
    { "name": "Pizza Chorizo", "price": 13.90, "description": "Chorizo, Mozzarella, Tomaten", "category": "Pizza" },
    { "name": "Mini green Salad", "price": 7.90, "description": "Frischer grüner Salat", "category": "Salad" },
    { "name": "Warm beef arugula salad", "price": 13.90, "description": "Warmer Rindfleisch-Rucola Salat", "category": "Salad" }
];

let basket = []
let deliveryFee = 4.99;

const container = document.getElementById("myDishes");

let html = "";
let lastCategory = "";

function getDishCardHTML(i) {
    return '<div class="card">' +
        '<div class="card-info">' +
        '<h4>' + myDishes[i].name + '</h4>' +
        '<p>' + myDishes[i].description + '</p>' +
        '</div>' +
        '<span class="card-price">' + myDishes[i].price.toFixed(2) + '€</span>' +
        '<button class="add-btn" onclick="addToBasket(' + i + ')">hinzufügen</button>' +
        '</div>';
}

for (let i = 0; i < myDishes.length; i++) {
    if (myDishes[i].category !== lastCategory) {
        html = html + '<h3 class="category-title">' + myDishes[i].category + '</h3>';
        lastCategory = myDishes[i].category;
    }

    html = html + getDishCardHTML(i);
}

container.innerHTML = html;

function addToBasket(index) {
    let dishName = myDishes[index].name;
    let dishPrice = myDishes[index].price;

    let found = false;

    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === dishName) {
            basket[i].quantity = basket[i].quantity + 1;
            found = true;
        }
    }

    if (found === false) {
        basket[basket.length] = {
            "name": dishName,
            "price": dishPrice,
            "quantity": 1
        }
    }
    renderBasket();
}

function getBasketItemHTML(i) {
    let itemTotal = basket[i].price * basket[i].quantity;

    return '<div class="basket-item">' +
        '<div class="basket-item-top">' +
        '<span class="basket-item-name">' + basket[i].quantity + ' x ' + basket[i].name + '</span>' +
        '<span class="basket-item-price">' + itemTotal.toFixed(2) + '€</span>' +
        '</div>' +
        '<div class="basket-item-bottom">' +
        '<button class="quantity-btn" onclick="changeQuantity(' + i + ', -1)">-</button>' +
        '<span class="quantity-display">' + basket[i].quantity + '</span>' +
        '<button class="quantity-btn" onclick="changeQuantity(' + i + ', 1)">+</button>' +
        '<button class="delete-btn" onclick="removeFromBasket(' + i + ')">🗑</button>' +
        '</div>' +
        '</div>';
}

function updateBasketSummary(subtotal) {
    let total = subtotal + deliveryFee;
    document.getElementById("subtotal").innerHTML = subtotal.toFixed(2) + '€';
    document.getElementById("total").innerHTML = total.toFixed(2) + '€';
    document.getElementById("buyBtn").innerHTML = 'jetzt bestellen (' + total.toFixed(2) + '€)';
    document.getElementById("buyBtn").onclick = buyNow;
    document.getElementById("basketSummary").className = "";
}

function renderBasket() {
    let basketItemsDiv = document.getElementById("basketItems");

    if (basket.length === 0) {
        basketItemsDiv.innerHTML = '<p class="basket-empty">Warenkorb Leer</p>';
        document.getElementById("basketSummary").className = "hidden";
        return;
    }

    let itemsHTML = "";
    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal = subtotal + (basket[i].price * basket[i].quantity);
        itemsHTML = itemsHTML + getBasketItemHTML(i);
    }

    basketItemsDiv.innerHTML = itemsHTML;
    updateBasketSummary(subtotal);
}

function changeQuantity(index, change) {
    basket[index].quantity = basket[index].quantity + change;

    if (basket[index].quantity <= 0) {
        removeFromBasket(index);
        return;
    }
    renderBasket();
}

function removeFromBasket(index) {
    let newBasket = [];

    for (let i = 0; i < basket.length; i++) {
        if (i !== index) {
            newBasket[newBasket.length] = basket[i];
        }
    }

    basket = newBasket;
    renderBasket();

}

function buyNow() {
    document.getElementById("confirmDialog").showModal();

    basket = [];
    renderBasket();

    setTimeout(closeDialog, 3000);
}

function closeDialog() {
    document.getElementById("confirmDialog").close();
}

function toggleMobileBasket() {
    let basketWrapper = document.querySelector(".basket_wrapper");

    if (basketWrapper.className === "basket_wrapper show-mobile") {
        basketWrapper.className = "basket_wrapper";
    } else {
        basketWrapper.className = "basket_wrapper show-mobile";
    }
}

function closeMobileBasket() {
    let basketWrapper = document.querySelector(".basket_wrapper");
    basketWrapper.className = "basket_wrapper";
}