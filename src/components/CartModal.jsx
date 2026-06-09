import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartModal() {
    const { isCartOpen, setIsCartOpen, cartItems, updateQty, clearCart, cartTotal, cartCount } = useContext(CartContext);

    if (!isCartOpen) return null;

    return (
        <div className="cart-modal open">
            <div className="cart-panel">
                <button className="cart-close" onClick={() => setIsCartOpen(false)}>✕</button>
                <h3>Tu carrito <small style={{ fontWeight: 600, marginLeft: '8px' }}>{cartCount}</small></h3>
                <div className="cart-items">
                    {cartItems.length === 0 ? <p className="empty">Tu carrito está vacío.</p> : null}
                    {cartItems.map((it, i) => (
                        <div className="cart-item" key={i}>
                            <div className="cart-item-left">
                                <img src={it.img} alt={it.title} className="cart-thumb" />
                                <div className="cart-item-info">
                                    <div className="cart-item-title">{it.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#ccc' }}>Talla: {it.size}</div>
                                    <div className="cart-item-price">${it.price.toLocaleString('es-CL')}</div>
                                </div>
                            </div>
                            <div className="cart-item-qty">
                                <button className="qty-minus" onClick={() => updateQty(it.id, it.size, it.qty - 1)}>−</button>
                                <input type="number" className="cart-qty-input" value={it.qty} readOnly />
                                <button className="qty-plus" onClick={() => updateQty(it.id, it.size, it.qty + 1)}>+</button>
                                <div className="cart-item-subtotal">${(it.price * it.qty).toLocaleString('es-CL')}</div>
                                <button className="remove-item" onClick={() => updateQty(it.id, it.size, 0)}>✕</button>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">Total: <strong>${cartTotal.toLocaleString('es-CL')}</strong></div>
                        <div className="cart-actions">
                            <button className="btn" onClick={clearCart}>Vaciar</button>
                            <button className="btn primary">Pagar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}