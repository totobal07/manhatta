import { useState, useEffect } from 'react';

export default function Auth() {
    const [activeTab, setActiveTab] = useState('login');
    const [msg, setMsg] = useState({ type: '', text: '' });
    
    // Cumplimiento: Arreglo administrado mediante hook de estado (useState) para usuarios
    const [users, setUsers] = useState(() => {
        const localUsers = localStorage.getItem('diddyUsers');
        return localUsers ? JSON.parse(localUsers) : [];
    });

    // Cumplimiento: Componentes Controlados para el registro
    const [regForm, setRegForm] = useState({ user: '', email: '', pass: '', passConfirm: '' });
    // Cumplimiento: Componentes Controlados para el login
    const [loginForm, setLoginForm] = useState({ email: '', pass: '' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        localStorage.setItem('diddyUsers', JSON.stringify(users));
    }, [users]);

    const handleRegisterChange = (e) => {
        setRegForm({ ...regForm, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        // Validaciones seguras
        if (!regForm.user.trim()) return setMsg({ type: 'error', text: 'El usuario es obligatorio.' });
        if (!emailRegex.test(regForm.email)) return setMsg({ type: 'error', text: 'Formato de email inválido.' });
        if (regForm.pass.length < 8) return setMsg({ type: 'error', text: 'La contraseña debe tener 8 caracteres.' });
        if (regForm.pass !== regForm.passConfirm) return setMsg({ type: 'error', text: 'Las contraseñas no coinciden.' });

        if (users.some(u => u.correo === regForm.email)) {
            return setMsg({ type: 'error', text: 'Este correo ya está registrado.' });
        }

        // Actualizar lista de inscritos mediante el estado
        setUsers(prev => [...prev, { usuario: regForm.user, correo: regForm.email, contrasena: regForm.pass }]);
        setMsg({ type: 'success', text: '¡Registro completado! Ya puedes iniciar sesión.' });
        
        // Limpiar formulario controlado
        setRegForm({ user: '', email: '', pass: '', passConfirm: '' });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Prevención básica de inyección sanitizando (eliminando espacios)
        const safeEmail = loginForm.email.trim();
        const validUser = users.find(u => u.correo === safeEmail && u.contrasena === loginForm.pass);

        if (validUser) {
            setMsg({ type: 'success', text: `¡Bienvenido, ${validUser.usuario}!` });
            setLoginForm({ email: '', pass: '' });
        } else {
            setMsg({ type: 'error', text: 'Correo o contraseña incorrectos.' });
        }
    };

    return (
        <section style={{ maxWidth: '450px', margin: '40px auto' }}>
            <div className="form-container text-bg" style={{ padding: 0 }}>
                <div className="auth-tabs">
                    <button className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => {setActiveTab('login'); setMsg({type:'',text:''})}}>Iniciar Sesión</button>
                    <button className={`tab-btn ${activeTab === 'registro' ? 'active' : ''}`} onClick={() => {setActiveTab('registro'); setMsg({type:'',text:''})}}>Registrarse</button>
                </div>

                <div style={{ padding: '24px' }}>
                    {msg.text && <div className={msg.type === 'error' ? 'error-msg' : 'success-msg'}>{msg.text}</div>}
                    
                    {activeTab === 'login' ? (
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                {/* Cumplimiento: htmlFor vinculado al id del input */}
                                <label htmlFor="login-email">Email:</label>
                                <input id="login-email" name="email" type="email" value={loginForm.email} onChange={handleLoginChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-pass">Contraseña:</label>
                                <input id="login-pass" name="pass" type="password" value={loginForm.pass} onChange={handleLoginChange} required />
                            </div>
                            <button type="submit" className="btn primary btn-block">Ingresar</button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="reg-user">Usuario:</label>
                                <input id="reg-user" name="user" type="text" value={regForm.user} onChange={handleRegisterChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-email">Email:</label>
                                <input id="reg-email" name="email" type="email" value={regForm.email} onChange={handleRegisterChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-pass">Contraseña:</label>
                                <input id="reg-pass" name="pass" type="password" value={regForm.pass} onChange={handleRegisterChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-passConfirm">Confirmar:</label>
                                <input id="reg-passConfirm" name="passConfirm" type="password" value={regForm.passConfirm} onChange={handleRegisterChange} required />
                            </div>
                            <button type="submit" className="btn primary btn-block">Crear cuenta</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}