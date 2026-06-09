import { useState } from 'react';

export default function Auth() {
    const [activeTab, setActiveTab] = useState('login');
    const [msg, setMsg] = useState({ type: '', text: '' });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleRegister = (e) => {
        e.preventDefault();
        const { user, email, pass, passConfirm } = e.target.elements;
        
        if (!user.value) return setMsg({ type: 'error', text: 'El usuario es obligatorio.' });
        if (!emailRegex.test(email.value)) return setMsg({ type: 'error', text: 'Formato de email inválido.' });
        if (pass.value.length < 8) return setMsg({ type: 'error', text: 'La contraseña debe tener 8 caracteres.' });
        if (pass.value !== passConfirm.value) return setMsg({ type: 'error', text: 'Las contraseñas no coinciden.' });

        const users = JSON.parse(localStorage.getItem('diddyUsers')) || [];
        if (users.some(u => u.correo === email.value)) {
            return setMsg({ type: 'error', text: 'Este correo ya está registrado.' });
        }

        users.push({ usuario: user.value, correo: email.value, contrasena: pass.value });
        localStorage.setItem('diddyUsers', JSON.stringify(users));
        setMsg({ type: 'success', text: '¡Registro completado! Ya puedes iniciar sesión.' });
        e.target.reset();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, pass } = e.target.elements;
        const users = JSON.parse(localStorage.getItem('diddyUsers')) || [];
        const validUser = users.find(u => u.correo === email.value && u.contrasena === pass.value);

        if (validUser) {
            setMsg({ type: 'success', text: `¡Bienvenido, ${validUser.usuario}!` });
            e.target.reset();
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
                            <div className="form-group"><label>Email:</label><input name="email" type="text" /></div>
                            <div className="form-group"><label>Contraseña:</label><input name="pass" type="password" /></div>
                            <button type="submit" className="btn primary btn-block">Ingresar</button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <div className="form-group"><label>Usuario:</label><input name="user" type="text" /></div>
                            <div className="form-group"><label>Email:</label><input name="email" type="text" /></div>
                            <div className="form-group"><label>Contraseña:</label><input name="pass" type="password" /></div>
                            <div className="form-group"><label>Confirmar:</label><input name="passConfirm" type="password" /></div>
                            <button type="submit" className="btn primary btn-block">Crear cuenta</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}