import { useState } from 'react';

export default function Contact() {
    // Cumplimiento: Componente Controlado
    const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' });
    const [feedback, setFeedback] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    const handleContact = (e) => {
        e.preventDefault();
        
        // Validación de campos y seguridad (Sanitización básica eliminando espacios)
        const safeName = contactForm.nombre.trim();
        const safeEmail = contactForm.email.trim();
        const safeMsg = contactForm.mensaje.trim();

        if (!safeName) return setErrorMsg('El nombre es obligatorio.');
        if (!emailRegex.test(safeEmail)) return setErrorMsg('Formato de email inválido.');
        if (!safeMsg) return setErrorMsg('El mensaje no puede estar vacío.');

        setErrorMsg('');
        setFeedback('¡Tu mensaje ha sido enviado!');
        
        // Limpiar el estado del formulario
        setContactForm({ nombre: '', email: '', mensaje: '' });
        
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => setFeedback(''), 3000);
    };

    return (
        <section style={{ maxWidth: '500px', margin: '40px auto' }}>
            <div className="form-container text-bg">
                <h2>Contacto</h2>
                <form onSubmit={handleContact}>
                    <div className="form-group">
                        {/* Cumplimiento: htmlFor vinculado al id del input */}
                        <label htmlFor="contact-name">Nombre:</label>
                        <input id="contact-name" name="nombre" type="text" value={contactForm.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-email">Email:</label>
                        <input id="contact-email" name="email" type="email" value={contactForm.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-msg">Mensaje:</label>
                        <textarea 
                            id="contact-msg" 
                            name="mensaje" 
                            rows="4" 
                            maxLength="300" 
                            required 
                            value={contactForm.mensaje} 
                            onChange={handleChange}
                        ></textarea>
                        <span className="char-counter">{contactForm.mensaje.length} / 300</span>
                    </div>
                    
                    {errorMsg && <div className="error-msg">{errorMsg}</div>}
                    
                    <button type="submit" className="btn primary btn-block" style={{ marginTop: '15px' }}>Enviar Mensaje</button>
                    {feedback && <div className="success-msg">{feedback}</div>}
                </form>
            </div>
        </section>
    );
}