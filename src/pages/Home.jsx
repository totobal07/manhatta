import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [search, setSearch] = useState('');
    
    // Consumir el inventario reactivo global
    const { products, addToCart } = useContext(CartContext);
    
    const slides = [
        { img: '/images/Gemini_Generated_Image_ymvx1symvx1symvx.png', text: 'Nuevas siluetas Y2K' },
        { img: '/images/gucci flashtrek.jpg', text: 'Cortes Oversized' },
        { img: '/images/unnamed.jpg', text: 'Estilo sin límites' }
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const cambiarImagen = (dir) => {
        setCurrentSlide(prev => (prev + dir + slides.length) % slides.length);
    };

    // Barra de búsqueda en base a lo escrito por teclado
    const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    // Filtrado por secciones lógicas
    const poleras = filteredProducts.filter(p => p.category === 'poleras');
    const pantalones = filteredProducts.filter(p => p.category === 'pantalones');
    const zapatillas = filteredProducts.filter(p => p.category === 'zapatillas');

    return (
        <main id="main">
            <section style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <p className="text-bg">Encuentra las mejores prendas para armar tu estilo.</p>
            </section>

            <section className="lookbook-section">
                <div className="lookbook-slider">
                    {slides.map((slide, index) => (
                        <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                            <img src={slide.img} alt={slide.text} />
                            <div className="slide-text">{slide.text}</div>
                        </div>
                    ))}
                </div>
                <div className="carousel-controls" style={{position:'absolute', bottom:'10px', width:'100%', display:'flex', justifyContent:'center', gap:'10px'}}>
                    <button onClick={() => cambiarImagen(-1)} style={{zIndex:10}}>Anterior</button>
                    <button onClick={() => cambiarImagen(1)} style={{zIndex:10}}>Siguiente</button>
                </div>
            </section>

            <section className="search-section">
                <div className="search-box">
                    <span>🔍</span>
                    <input type="text" placeholder="Buscar prendas, marcas o colores..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </section>

            <section id="catalog">
                <h2 className="text-bg">Nuestro Catálogo</h2>

                {poleras.length > 0 && (
                    <div className="category" id="cat-poleras">
                        <h3 className="text-bg">Poleras y Hoodies</h3>
                        <div className="catalog">
                            {poleras.map(prod => <ProductCard key={prod.id} product={prod} addToCart={addToCart} />)}
                        </div>
                    </div>
                )}

                {pantalones.length > 0 && (
                    <div className="category" id="cat-pantalones">
                        <h3 className="text-bg">Pantalones</h3>
                        <div className="catalog">
                            {pantalones.map(prod => <ProductCard key={prod.id} product={prod} addToCart={addToCart} />)}
                        </div>
                    </div>
                )}

                {zapatillas.length > 0 && (
                    <div className="category" id="cat-zapatillas">
                        <h3 className="text-bg">Zapatillas</h3>
                        <div className="catalog">
                            {zapatillas.map(prod => <ProductCard key={prod.id} product={prod} addToCart={addToCart} />)}
                        </div>
                    </div>
                )}
                
                {filteredProducts.length === 0 && (
                    <p className="text-bg" style={{ textAlign: 'center', marginTop: '20px' }}>No se encontraron productos coincidentes.</p>
                )}
            </section>
        </main>
    );
}

function ProductCard({ product, addToCart }) {
    const [size, setSize] = useState(product.sizes[0] || 'Única');
    const [qty, setQty] = useState(1);

    return (
        <div className="product-card">
            <img src={product.img} alt={product.title} className="product-image" />
            <div className="product-info">
                <h3>{product.title}</h3>
                <ul>
                    <li>Color: {product.color}</li>
                    <li>
                        <label>Talla:</label>
                        <select className="size-select" value={size} onChange={(e) => setSize(e.target.value)}>
                            {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </li>
                    <li className="price">Precio: ${product.price.toLocaleString('es-CL')}</li>
                </ul>
                <div className="product-buy">
                    <input type="number" className="qty-input" min="1" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} />
                    <button onClick={() => addToCart(product, qty, size)}>Comprar</button>
                </div>
            </div>
        </div>
    );
}