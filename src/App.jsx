import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, CartContext } from './context/CartContext';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import Footer from './components/footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { useContext } from 'react';

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
                    <Route path="/admin" element={<Admin />} />
                </Routes>
                <CartModal />
                <ToastRenderer />
                <Footer />
            </BrowserRouter>
        </CartProvider>
    );
}