import { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

export const CartContext = createContext();

export function CartProvider({ children }) {
    // CRUD: Estado global para el inventario de productos
    const [products, setProducts] = useState(() => {
        const localProd = localStorage.getItem('diddy_products');
        return localProd ? JSON.parse(localProd) : initialProducts;
    });

    // Estado global para el carrito de compras
    const [cartItems, setCartItems] = useState(() => {
        const local = localStorage.getItem('diddy_cart_v2');
        return local ? JSON.parse(local).items : [];
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    // Sincronizar catálogo con localStorage
    useEffect(() => {
        localStorage.setItem('diddy_products', JSON.stringify(products));
    }, [products]);

    // Sincronizar carrito con localStorage
    useEffect(() => {
        localStorage.setItem('diddy_cart_v2', JSON.stringify({ items: cartItems }));
    }, [cartItems]);

    // ==========================================
    // FUNCIONES DEL CRUD DE PRODUCTOS
    // ==========================================
    const addProduct = (newProd) => {
        setProducts(prev => [...prev, { ...newProd, id: 'prod-' + Date.now() }]);
        showToast('✓ Producto creado con éxito');
    };

    const updateProduct = (id, updatedProd) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...updatedProd, id } : p));
        showToast('✓ Producto actualizado con éxito');
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        setCartItems(prev => prev.filter(item => item.id !== id)); // Limpiar del carrito si se elimina
        showToast('✕ Producto eliminado');
    };

    // ==========================================
    // FUNCIONES DEL CARRITO
    // ==========================================
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
        <CartContext.Provider value={{ 
            products, addProduct, updateProduct, deleteProduct,
            cartItems, addToCart, updateQty, clearCart, cartTotal, cartCount, 
            isCartOpen, setIsCartOpen, toasts 
        }}>
            {children}
        </CartContext.Provider>
    );
}