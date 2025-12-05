// Select all product cards
const cards = document.querySelectorAll('.card-body');

// Function to update the total price
function updateTotal() {
    let total = 0;
    cards.forEach(card => {
        const quantity = parseInt(card.querySelector('.quantity').textContent);
        const price = parseInt(card.querySelector('.unit-price').textContent);
        total += quantity * price;
    });
    document.querySelector('.total').textContent = `${total} $`;
}

// Loop through each card to attach event listeners
cards.forEach(card => {
    const plusBtn = card.querySelector('.fa-plus-circle');
    const minusBtn = card.querySelector('.fa-minus-circle');
    const trashBtn = card.querySelector('.fa-trash-alt');
    const heartBtn = card.querySelector('.fa-heart');
    const quantitySpan = card.querySelector('.quantity');

    // Increment quantity
    plusBtn.addEventListener('click', () => {
        quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
        updateTotal();
    });

    // Decrement quantity
    minusBtn.addEventListener('click', () => {
        if (parseInt(quantitySpan.textContent) > 0) {
            quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
            updateTotal();
        }
    });

    // Delete item
    trashBtn.addEventListener('click', () => {
        card.closest('.card-body').remove();
        updateTotal();
    });

    // Toggle like (heart)
    heartBtn.addEventListener('click', () => {
        heartBtn.classList.toggle('liked');
        // Optional: change color with CSS class
        if (heartBtn.classList.contains('liked')) {
            heartBtn.style.color = 'red';
        } else {
            heartBtn.style.color = 'black';
        }
    });
});

// Initialize total on page load
updateTotal();
