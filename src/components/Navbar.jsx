import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
    const { cartCount, cartTotal, setIsCartOpen } = useContext(CartContext);

    return (
        <header className="site-header">
            <div className="brand-bg text-bg header-brand">
                <div className="brand-text">
                    <div className="subtitle">www.diddystore.com</div>
                    <h1>Diddy Store</h1>
                </div>
            </div>
            <nav aria-label="Principal" className="main-nav">
                <div className="nav-bg text-bg nav-inner">
                    <Link to="/">Inicio</Link>
                    <span className="nav-sep">|</span>
                    <Link to="/auth">Cuenta</Link>
                    <span className="nav-sep">|</span>
                    <Link to="/contacto">Contacto</Link>
                    <span className="nav-sep">|</span>
                    <Link to="/admin" style={{ color: 'var(--btn-start)' }}> Admin</Link>
                </div>
            </nav>

            <div id="cart" className="cart" onClick={() => setIsCartOpen(true)} style={{cursor: 'pointer'}}>
                <span className="cart-icon">🛒</span>
                <span className="cart-count">{cartCount}</span>
                <span className="cart-total">${cartTotal.toLocaleString('es-CL')}</span>
            </div>
        </header>
    );
}