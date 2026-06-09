import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, CartContext } from './context/CartContext';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import { useContext } from 'react';

// Subcomponente para renderizar las notificaciones globales
function ToastRenderer() {
    const { toasts } = useContext(CartContext);
    return (
        <div className="toast-container">
            {toasts.map(t => (
                <div key={t.id} className={`toast ${t.fadeOut ? 'fade-out' : ''}`}>{t.msg}</div>
            ))}
        </div>
    );
}

export default function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/contacto" element={<Contact />} />
                </Routes>
                <CartModal />
                <ToastRenderer />
                
                <footer style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', marginTop: 'auto' }}>
                    <p className="text-bg">Marca registrada totobal.Inc :V .</p>
                </footer>
            </BrowserRouter>
        </CartProvider>
    );
}