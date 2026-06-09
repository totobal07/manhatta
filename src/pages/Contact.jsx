import { useState } from 'react';

export default function Contact() {
    const [msgText, setMsgText] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleContact = (e) => {
        e.preventDefault();
        setFeedback('¡Tu mensaje ha sido enviado!');
        e.target.reset();
        setMsgText('');
    };

    return (
        <section style={{ maxWidth: '500px', margin: '40px auto' }}>
            <div className="form-container text-bg">
                <h2>Contacto</h2>
                <form onSubmit={handleContact}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" required />
                    </div>
                    <div className="form-group">
                        <label>Mensaje:</label>
                        <textarea rows="4" maxLength="300" required value={msgText} onChange={(e) => setMsgText(e.target.value)}></textarea>
                        <span className="char-counter">{msgText.length} / 300</span>
                    </div>
                    <button type="submit" className="btn primary btn-block">Enviar Mensaje</button>
                    {feedback && <div className="success-msg">{feedback}</div>}
                </form>
            </div>
        </section>
    );
}