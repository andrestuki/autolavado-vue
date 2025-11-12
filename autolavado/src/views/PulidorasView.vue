<template>
    <div class="container">
        <MiHeader></MiHeader>

        <div class="productos-section">
            <div class="productos-header">
                <h1>✨ Pulidoras y Ceras</h1>
                <p class="subtitle">Brillo profesional y protección duradera</p>
            </div>

            <!-- Loading -->
            <div v-if="cargando" class="loading">
                <div class="spinner"></div>
                <p>Cargando productos...</p>
            </div>

            <!-- Productos -->
            <div v-else-if="productos.length > 0" class="productos-grid">
                <div v-for="producto in productos" :key="producto.id_hidrobomba" class="producto-card">
                    <div class="producto-imagen">
                        <img :src="producto.imagen" :alt="producto.nombre" class="imagen" />
                        <div class="rating">
                            <span class="stars">⭐ {{ producto.raiting }}</span>
                        </div>
                    </div>

                    <div class="producto-info">
                        <h3>{{ producto.nombre }}</h3>
                        <p class="marca">{{ producto.marca }}</p>

                        <div class="producto-detalles">
                            <span class="stock" :class="{ 'sin-stock': producto.cantidad === 0 }">
                                {{ producto.cantidad > 0 ? `${producto.cantidad} disponibles` : 'Sin stock' }}
                            </span>
                        </div>

                        <div class="producto-footer">
                            <div class="precio">
                                <span class="valor">${{ Number(producto.precio).toLocaleString('es-CO') }}</span>
                            </div>
                            <button @click="agregarAlCarrito(producto)" class="btn-agregar"
                                :disabled="producto.cantidad === 0">
                                🛒 Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sin productos -->
            <div v-else class="sin-productos">
                <p>No hay productos disponibles en esta categoría</p>
            </div>
        </div>

        <MiFooter></MiFooter>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { cargarProductos } from '@/utilities/productosManager'
import MiHeader from '@/components/compoHome/MiHeader.vue'
import MiFooter from '@/components/compoHome/MiFooter.vue'

export default {
    name: 'PulidorasView',
    components: {
        MiHeader,
        MiFooter,
    },
    data() {
        return {
            cartStore: useCartStore(),
            productos: [],
            cargando: true,
        }
    },
    methods: {
        async cargarProductos() {
            this.cargando = true
            try {
                const todosLosProductos = await cargarProductos()
                // Filtrar solo pulidoras (categoría 3)
                this.productos = todosLosProductos.filter((p) => p.id_categoria === 3)
            } catch (error) {
                console.error('Error cargando productos:', error)
                this.productos = []
            } finally {
                this.cargando = false
            }
        },
        agregarAlCarrito(producto) {
            const item = {
                id_producto: producto.id_hidrobomba,
                id_hidrobomba: producto.id_hidrobomba,
                nombre: producto.nombre,
                marca: producto.marca,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1,
            }

            this.cartStore.addToCart(item)
            alert(`✅ ${producto.nombre} agregado al carrito`)
        },
    },
    mounted() {
        this.cargarProductos()
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.productos-section {
    flex: 1;
    padding: 40px 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e2c3c3 100%);
}

.productos-header {
    text-align: center;
    margin-bottom: 50px;
}

.productos-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
}

.productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1400px;
    margin: 0 auto;
}

.producto-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
}

.producto-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.producto-imagen {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: #f0f0f0;
}

.imagen {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.producto-card:hover .imagen {
    transform: scale(1.05);
}

.rating {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
}

.producto-info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.producto-info h3 {
    font-size: 1.1rem;
    color: #2c3e50;
    margin-bottom: 5px;
    height: 2.2em;
    overflow: hidden;
}

.marca {
    font-size: 0.9rem;
    color: #95a5a6;
    margin-bottom: 10px;
}

.producto-detalles {
    margin-bottom: 15px;
    flex: 1;
}

.stock {
    display: inline-block;
    padding: 5px 10px;
    background: #d4edda;
    color: #155724;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
}

.stock.sin-stock {
    background: #f8d7da;
    color: #721c24;
}

.producto-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border-top: 1px solid #ecf0f1;
    padding-top: 15px;
}

.precio {
    display: flex;
    flex-direction: column;
}

.valor {
    font-size: 1.5rem;
    font-weight: bold;
    color: #27ae60;
}

.btn-agregar {
    flex: 1;
    padding: 10px 15px;
    background: linear-gradient(135deg, #ea6666 0%, #a24b4b 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-agregar:hover:not(:disabled) {
    background: linear-gradient(135deg, #a24b4b 0%, #ea6666 100%);
    transform: scale(1.05);
}

.btn-agregar:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    opacity: 0.6;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #ecf0f1;
    border-top: 4px solid #db3434;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.sin-productos {
    text-align: center;
    padding: 60px 20px;
    color: #7f8c8d;
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .productos-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 20px;
    }

    .productos-header h1 {
        font-size: 1.8rem;
    }

    .producto-imagen {
        height: 150px;
    }

    .producto-info h3 {
        font-size: 0.95rem;
    }
}
</style>
