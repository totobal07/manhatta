export default function Footer() {
    return (
        <footer id="footer" style={{ marginTop: '50px', padding: '20px 0' }}>
            <div className="text-bg" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '6px',
                width: '90%',
                maxWidth: '550px',
                margin: '0 auto',
                padding: '20px',
                textAlign: 'center',
                border: '1px solid var(--primary)',
                borderRadius: '12px'
            }}>
                <div style={{ fontWeight: 'bold', letterSpacing: '1px', color: 'var(--primary)', marginBottom: '4px' }}>
                    🎓 FICHA DE EVALUACIÓN
                </div>
                <div style={{ fontSize: '0.95rem' }}>
                    <strong>Alumno:</strong> Cristóbal Vidal
                </div>
                <div style={{ fontSize: '0.95rem' }}>
                    <strong>Profesor:</strong> [Victor Vásquez]
                </div>
                <div style={{ fontSize: '0.95rem' }}>
                    <strong>Asignatura:</strong> [Programacion Front End]
                </div>
                <div style={{ fontSize: '0.95rem' }}>
                    <strong>Sección:</strong> [IEI-N3-P2-C2]
                </div>
                <div style={{ 
                    fontSize: '0.8rem', 
                    opacity: 0.5, 
                    marginTop: '10px', 
                    borderTop: '1px solid rgba(255,255,255,0.1)', 
                    paddingTop: '8px', 
                    width: '100%' 
                }}>
                    Diddy Store &copy; {new Date().getFullYear()} - ttobal.Inc
                </div>
            </div>
        </footer>
    );
}