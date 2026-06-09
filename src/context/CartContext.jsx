import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const local = localStorage.getItem('diddy_cart_v2');
        return local ? JSON.parse(local).items : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        localStorage.setItem('diddy_cart_v2', JSON.stringify({ items: cartItems }));
    }, [cartItems]);

    const addToCart = (product, qty, size) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id && item.size === size);
            if (existing) {
                return prev.map(item => item === existing ? { ...item, qty: item.qty + qty } : item);
            }
            return [...prev, { ...product, qty, size }];
        });
        showToast(`✓ Agregado: ${product.title} (Talla ${size})`);
    };

    const updateQty = (id, size, newQty) => {
        if (newQty <= 0) {
            setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
        } else {
            setCartItems(prev => prev.map(item => (item.id === id && item.size === size) ? { ...item, qty: newQty } : item));
        }
    };

    const clearCart = () => setCartItems([]);

    const showToast = (msg) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, msg }]);
        setTimeout(() => setToasts(prev => prev.map(t => t.id === id ? { ...t, fadeOut: true } : t)), 2500);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQty, clearCart, cartTotal, cartCount, isCartOpen, setIsCartOpen, toasts }}>
            {children}
        </CartContext.Provider>
    );
}