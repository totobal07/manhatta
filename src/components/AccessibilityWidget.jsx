import { useState, useEffect } from 'react';

export default function AccessibilityWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100); // Porcentaje base
    const [highContrast, setHighContrast] = useState(false);

    // Efecto para cambiar el tamaño de la letra en toda la página
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    // Efecto para activar o desactivar el alto contraste
    useEffect(() => {
        if (highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }, [highContrast]);

    // Funciones de control
    const increaseText = () => setFontSize(prev => Math.min(prev + 10, 150)); // Máximo 150%
    const decreaseText = () => setFontSize(prev => Math.max(prev - 10, 80));  // Mínimo 80%
    const toggleContrast = () => setHighContrast(!highContrast);

    return (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999 }}>
            {isOpen && (
                <div className="text-bg" style={{ 
                    marginBottom: '10px', 
                    padding: '15px', 
                    borderRadius: '12px', 
                    border: '2px solid var(--primary)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
                }}>
                    <h4 style={{ margin: '0 0 12px 0', textAlign: 'center', fontSize: '1.1rem' }}>
                        Accesibilidad (AAA)
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button onClick={increaseText} className="btn" aria-label="Aumentar tamaño del texto">
                            Aumentar Texto (A+)
                        </button>
                        <button onClick={decreaseText} className="btn" aria-label="Reducir tamaño del texto">
                            Reducir Texto (A-)
                        </button>
                        <button onClick={toggleContrast} className="btn primary" aria-label="Alternar modo de alto contraste">
                            {highContrast ? 'Quitar Alto Contraste' : 'Activar Alto Contraste'}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Botón Flotante */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="btn primary" 
                style={{ 
                    width: '55px', 
                    height: '55px', 
                    borderRadius: '50%', 
                    fontSize: '28px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                    padding: 0
                }}
                aria-label={isOpen ? "Cerrar menú de accesibilidad" : "Abrir menú de accesibilidad"}
                title="Opciones de Accesibilidad"
            >
                ♿
            </button>
        </div>
    );
}