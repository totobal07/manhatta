import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Admin() {
    // ==========================================
    // ESTADO DE AUTENTICACIÓN
    // ==========================================
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Credenciales maestras para el administrador
    const ADMIN_CREDENTIALS = {
        email: 'admin@diddy.com',
        password: 'admin'
    };

    // Verificar si el admin ya había iniciado sesión previamente
    useEffect(() => {
        const adminSession = localStorage.getItem('diddy_admin_logged');
        if (adminSession === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (loginData.email === ADMIN_CREDENTIALS.email && loginData.password === ADMIN_CREDENTIALS.password) {
            setIsAuthenticated(true);
            localStorage.setItem('diddy_admin_logged', 'true');
            setLoginError('');
        } else {
            setLoginError('Credenciales incorrectas. Acceso denegado.');
        }
    };

    const handleAdminLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('diddy_admin_logged');
        setLoginData({ email: '', password: '' });
    };

    // ==========================================
    // ESTADO DEL CRUD
    // ==========================================
    const { products, addProduct, updateProduct, deleteProduct } = useContext(CartContext);
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    
    const [form, setForm] = useState({
        title: '',
        category: 'poleras',
        color: '',
        price: '',
        img: '/images/Gemini_Generated_Image_ymvx1symvx1symvx.png',
        sizes: 'S, M, L'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const processedSizes = form.sizes.split(',').map(s => s.trim()).filter(s => s !== '');
        
        const productData = {
            ...form,
            price: Number(form.price) || 0,
            sizes: processedSizes.length > 0 ? processedSizes : ['Única']
        };

        if (isEditing) {
            updateProduct(currentId, productData);
            setIsEditing(false);
            setCurrentId(null);
        } else {
            addProduct(productData);
        }

        setForm({
            title: '',
            category: 'poleras',
            color: '',
            price: '',
            img: '/images/Gemini_Generated_Image_ymvx1symvx1symvx.png',
            sizes: 'S, M, L'
        });
    };

    const handleEditClick = (prod) => {
        setIsEditing(true);
        setCurrentId(prod.id);
        setForm({
            title: prod.title,
            category: prod.category,
            color: prod.color,
            price: prod.price,
            img: prod.img,
            sizes: prod.sizes.join(', ')
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentId(null);
        setForm({
            title: '',
            category: 'poleras',
            color: '',
            price: '',
            img: '/images/Gemini_Generated_Image_ymvx1symvx1symvx.png',
            sizes: 'S, M, L'
        });
    };

    // ==========================================
    // RENDER: PANTALLA DE LOGIN
    // ==========================================
    if (!isAuthenticated) {
        return (
            <main style={{ padding: '20px', maxWidth: '400px', margin: '40px auto' }}>
                <div className="form-container text-bg" style={{ border: '1px solid #ef4444' }}>
                    <h2 style={{ color: '#ef4444', textAlign: 'center' }}>🔒 Acceso Restringido</h2>
                    <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
                        Área exclusiva para la administración del inventario.
                    </p>
                    <form onSubmit={handleAdminLogin}>
                        <div className="form-group">
                            <label>Email de Admin:</label>
                            <input 
                                type="email" 
                                value={loginData.email} 
                                onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                                required 
                                placeholder="admin@diddy.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input 
                                type="password" 
                                value={loginData.password} 
                                onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                                required 
                                placeholder="••••••••"
                            />
                        </div>
                        {loginError && <div className="error-msg" style={{ textAlign: 'center', marginBottom: '10px' }}>{loginError}</div>}
                        <button type="submit" className="btn primary btn-block" style={{ background: '#ef4444', color: '#fff' }}>
                            Ingresar
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    // ==========================================
    // RENDER: PANEL CRUD (Si está autenticado)
    // ==========================================
    return (
        <main style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
            <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 className="text-bg" style={{ margin: 0 }}>⚙️ Panel de Control Inventario</h2>
                <button onClick={handleAdminLogout} className="btn" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Cerrar Sesión Admin
                </button>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
                
                {/* FORMULARIO DE ACCIÓN */}
                <div className="form-container text-bg">
                    <h2>{isEditing ? '✏️ Editar Producto' : '➕ Añadir Producto'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre del Producto:</label>
                            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Ej: Polera Nike Pro" />
                        </div>
                        <div className="form-group">
                            <label>Categoría del Catálogo:</label>
                            <select name="category" value={form.category} onChange={handleChange} className="size-select" style={{ marginLeft: 0, padding: '10px', width: '100%', borderRadius: '6px' }}>
                                <option value="poleras">Poleras y Hoodies</option>
                                <option value="pantalones">Pantalones</option>
                                <option value="zapatillas">Zapatillas</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Color / Detalles:</label>
                            <input type="text" name="color" value={form.color} onChange={handleChange} required placeholder="Ej: Vintage Black" />
                        </div>
                        <div className="form-group">
                            <label>Precio Unitario ($):</label>
                            <input type="number" name="price" value={form.price} onChange={handleChange} required placeholder="Ej: 19990" />
                        </div>
                        <div className="form-group">
                            <label>Ruta de la Imagen Asset:</label>
                            <input type="text" name="img" value={form.img} onChange={handleChange} required placeholder="Ej: /images/unnamed.jpg" />
                        </div>
                        <div className="form-group">
                            <label>Tallas Disponibles (Separadas por comas):</label>
                            <input type="text" name="sizes" value={form.sizes} onChange={handleChange} placeholder="Ej: S, M, L o 40, 42, 44" />
                        </div>

                        <button type="submit" className="btn primary btn-block">
                            {isEditing ? 'Guardar Cambios' : 'Registrar en Catálogo'}
                        </button>
                        {isEditing && (
                            <button type="button" className="btn btn-block" onClick={handleCancel} style={{ marginTop: '10px' }}>
                                Cancelar Edición
                            </button>
                        )}
                    </form>
                </div>

                {/* TABLA DE VISUALIZACIÓN */}
                <div className="text-bg" style={{ padding: '20px', borderRadius: '12px', overflowX: 'auto' }}>
                    <h2>📋 Productos Registrados ({products.length})</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', color: '#fff' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--primary)', textAlign: 'left' }}>
                                <th style={{ padding: '10px' }}>Item</th>
                                <th style={{ padding: '10px' }}>Detalles</th>
                                <th style={{ padding: '10px' }}>Precio</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => (
                                <tr key={prod.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <td style={{ padding: '10px' }}>
                                        <img src={prod.img} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)' }} />
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <strong style={{ color: 'var(--primary)' }}>{prod.title}</strong>
                                        <div style={{ fontSize: '0.75rem', color: '#ccc' }}>Sección: {prod.category}</div>
                                    </td>
                                    <td style={{ padding: '10px' }}>${prod.price.toLocaleString('es-CL')}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                        <button className="qty-plus" style={{ padding: '6px 10px', fontSize: '0.85rem', marginRight: '6px' }} onClick={() => handleEditClick(prod)}>✏️</button>
                                        <button className="remove-item" style={{ padding: '6px 10px', fontSize: '0.85rem', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white' }} onClick={() => deleteProduct(prod.id)}>✕</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}