// components/helpers.js

export function toggleCartModal() {
    alert('Your cart is empty! Add some fresh produce to get started 🛒');
}

export function scrollToShop() {
    if (typeof window !== 'undefined') {
        window.scrollTo({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
}