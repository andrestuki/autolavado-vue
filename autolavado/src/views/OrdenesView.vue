<template>
    <div class="ordenes-container">
        <div class="ordenes-header">
            <h1>📦 Mis Órdenes</h1>
            <router-link to="/" class="btn-volver">← Volver</router-link>
        </div>

        <!-- Sin órdenes -->
        <div v-if="ordenes.length === 0" class="sin-ordenes">
            <div class="icono">📭</div>
            <h2>No tienes órdenes aún</h2>
            <p>¡Realiza tu primera compra!</p>
            <router-link to="/" class="btn-comprar">Ir a Comprar</router-link>
        </div>

        <!-- Con órdenes -->
        <div v-else class="ordenes-lista">
            <div v-for="orden in ordenes" :key="orden.idOrden" class="orden-card">
                <div class="orden-header">
                    <div class="orden-info">
                        <h3>#{{ orden.idOrden }}</h3>
                        <p class="fecha">{{ formatearFecha(orden.fecha) }}</p>
                    </div>
                    <div class="orden-estado">
                        <span :class="['badge', 'badge-' + orden.estado]">{{ orden.estado }}</span>
                    </div>
                </div>

                <div class="orden-detalles">
                    <div class="detalle-item">
                        <span class="label">Total:</span>
                        <span class="valor">${{ Number(orden.total).toLocaleString('es-CO') }}</span>
                    </div>
                    <div class="detalle-item">
                        <span class="label">Productos:</span>
                        <span class="valor">{{ orden.productos?.length || 0 }} items</span>
                    </div>
                    <div class="detalle-item" v-if="orden.datosEnvio">
                        <span class="label">Envío:</span>
                        <span class="valor">{{ tipoEnvioTexto(orden.datosEnvio.tipo) }}</span>
                    </div>
                </div>

                <div class="productos-lista">
                    <h4>Productos:</h4>
                    <div v-for="prod in orden.productos" :key="prod.id_producto" class="producto-item">
                        <div class="prod-info">
                            <img v-if="prod.imagen" :src="prod.imagen" :alt="prod.nombre" class="prod-img" />
                            <div>
                                <strong>{{ prod.nombre }}</strong>
                                <p class="cantidad">x{{ prod.cantidad }}</p>
                            </div>
                        </div>
                        <div class="prod-precio">
                            ${{ (Number(prod.precio) * prod.cantidad).toLocaleString('es-CO') }}
                        </div>
                    </div>
                </div>

                <div class="orden-acciones">
                    <button @click="descargarRecibo(orden)" class="btn-recibo">📄 Descargar Recibo</button>
                    <button @click="repetirCompra(orden)" class="btn-repetir">🔄 Repetir Compra</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default {
    name: 'OrdenesView',
    data() {
        return {
            authStore: useAuthStore(),
            cartStore: useCartStore(),
            ordenes: [],
        }
    },
    methods: {
        cargarOrdenes() {
            if (!this.authStore.isLoggedIn) {
                this.$router.push('/login')
                return
            }

            const ordenesJSON = localStorage.getItem('ordenes')
            const todasLasOrdenes = ordenesJSON ? JSON.parse(ordenesJSON) : []

            // Filtrar órdenes del usuario actual
            this.ordenes = todasLasOrdenes
                .filter(orden => orden.idUsuario === this.authStore.idUsuario)
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        },
        formatearFecha(fecha) {
            if (!fecha) return ''
            return new Date(fecha).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
        },
        tipoEnvioTexto(tipo) {
            const textos = {
                gratis: 'A Sucursal (Gratis)',
                domicilio: 'A Domicilio',
                express: 'Express',
            }
            return textos[tipo] || tipo
        },
        descargarRecibo(orden) {
            const contenido = `
RECIBO DE COMPRA
================

Número de Orden: #${orden.idOrden}
Fecha: ${this.formatearFecha(orden.fecha)}
Cliente: ${orden.usuario}
Email: ${orden.email}

PRODUCTOS:
----------
${orden.productos
                    .map(
                        p =>
                            `${p.nombre}
  Cantidad: ${p.cantidad}
  Precio unitario: $${Number(p.precio).toLocaleString('es-CO')}
  Subtotal: $${(Number(p.precio) * p.cantidad).toLocaleString('es-CO')}
`
                    )
                    .join('\n')}

RESUMEN:
--------
Subtotal: $${Number(orden.total).toLocaleString('es-CO')}
Impuesto (19%): $${(Number(orden.total) * 0.19).toLocaleString('es-CO')}
Envío: $${orden.datosEnvio?.costo || 0}
TOTAL: $${(Number(orden.total) + Number(orden.total) * 0.19 + (orden.datosEnvio?.costo || 0)).toLocaleString('es-CO')}

Estado: ${orden.estado}
Tipo de Envío: ${this.tipoEnvioTexto(orden.datosEnvio?.tipo)}

Gracias por tu compra!
      `

            const blob = new Blob([contenido], { type: 'text/plain' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `recibo-${orden.idOrden}.txt`
            link.click()
        },
        repetirCompra(orden) {
            if (confirm('¿Quieres agregar estos productos al carrito?')) {
                orden.productos.forEach(producto => {
                    this.cartStore.addToCart({
                        ...producto,
                        cantidad: producto.cantidad,
                    })
                })
                this.$router.push('/carrito')
            }
        },
    },
    mounted() {
        this.cargarOrdenes()
    },
}
</script>

<style scoped>
.ordenes-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e2c3c3 100%);
    padding: 40px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ordenes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 900px;
    margin: 0 auto 40px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.ordenes-header h1 {
    margin: 0;
    color: #333;
    font-size: 32px;
}

.btn-volver {
    padding: 10px 20px;
    background: #95a5a6;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.btn-volver:hover {
    background: #7f8c8d;
    transform: translateX(-5px);
}

.sin-ordenes {
    max-width: 500px;
    margin: 60px auto;
    text-align: center;
    background: white;
    padding: 60px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.icono {
    font-size: 80px;
    margin-bottom: 20px;
}

.sin-ordenes h2 {
    color: #333;
    margin: 20px 0;
}

.sin-ordenes p {
    color: #777;
    font-size: 16px;
    margin-bottom: 30px;
}

.btn-comprar {
    display: inline-block;
    padding: 14px 30px;
    background: linear-gradient(135deg, #ea6666 0%, #a24b4b 100%);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-comprar:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.ordenes-lista {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.orden-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.orden-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.orden-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #ea6666 0%, #a24b4b 100%);
    color: white;
}

.orden-info h3 {
    margin: 0 0 5px 0;
    font-size: 24px;
}

.fecha {
    margin: 0;
    font-size: 13px;
    opacity: 0.9;
}

.badge {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.badge-pendiente {
    background: rgba(243, 156, 18, 0.3);
    color: white;
}

.badge-completada {
    background: rgba(46, 204, 113, 0.3);
    color: white;
}

.badge-cancelada {
    background: rgba(231, 76, 60, 0.3);
    color: white;
}

.orden-detalles {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    border-bottom: 1px solid #eee;
}

.detalle-item {
    display: flex;
    flex-direction: column;
}

.label {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 5px;
}

.valor {
    font-size: 18px;
    font-weight: 600;
    color: #ea6666;
}

.productos-lista {
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.productos-lista h4 {
    margin: 0 0 15px 0;
    color: #333;
}

.producto-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.producto-item:last-child {
    border-bottom: none;
}

.prod-info {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
}

.prod-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
}

.prod-info strong {
    display: block;
    color: #333;
    margin-bottom: 2px;
}

.cantidad {
    margin: 0;
    font-size: 12px;
    color: #999;
}

.prod-precio {
    font-weight: 600;
    color: #27ae60;
}

.orden-acciones {
    padding: 15px 20px;
    display: flex;
    gap: 10px;
}

.btn-recibo,
.btn-repetir {
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-recibo {
    background: #db3434;
    color: white;
}

.btn-recibo:hover {
    background: #b92929;
}

.btn-repetir {
    background: #27ae60;
    color: white;
}

.btn-repetir:hover {
    background: #229954;
}

@media (max-width: 1200px) {
    .ordenes-lista {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
    }

    .orden-card {
        padding: 20px;
    }
}

@media (max-width: 768px) {
    .ordenes-container {
        padding: 20px 15px;
    }

    .ordenes-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
        margin-bottom: 25px;
    }

    .ordenes-header h1 {
        font-size: 1.6rem;
    }

    .btn-volver {
        width: 100%;
        padding: 10px;
        font-size: 0.9rem;
    }

    .ordenes-lista {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .orden-card {
        padding: 15px;
    }

    .orden-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .orden-header h3 {
        font-size: 1.2rem;
    }

    .orden-detalles {
        grid-template-columns: 1fr;
        gap: 8px;
    }

    .detalle-item {
        padding: 8px 0;
        font-size: 0.9rem;
    }

    .productos-lista {
        padding: 12px 0;
    }

    .productos-lista h4 {
        font-size: 1rem;
        margin-bottom: 10px;
    }

    .producto-item {
        padding: 10px 0;
        gap: 10px;
    }

    .prod-img {
        width: 50px;
        height: 50px;
    }

    .prod-info {
        gap: 8px;
    }

    .prod-info strong {
        font-size: 0.9rem;
    }

    .prod-precio {
        font-size: 0.95rem;
    }

    .orden-acciones {
        flex-direction: column;
        padding: 12px 0;
        gap: 8px;
    }

    .btn-recibo,
    .btn-repetir {
        width: 100%;
        padding: 10px;
        font-size: 0.9rem;
    }

    .sin-ordenes {
        text-align: center;
        padding: 40px 20px;
    }

    .icono {
        font-size: 4rem;
        margin-bottom: 15px;
    }

    .sin-ordenes h2 {
        font-size: 1.4rem;
        margin-bottom: 10px;
    }

    .sin-ordenes p {
        font-size: 0.95rem;
        margin-bottom: 20px;
    }

    .btn-comprar {
        display: inline-block;
        padding: 10px 20px;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .ordenes-container {
        padding: 15px 10px;
    }

    .ordenes-header {
        margin-bottom: 20px;
    }

    .ordenes-header h1 {
        font-size: 1.3rem;
    }

    .btn-volver {
        font-size: 0.8rem;
    }

    .ordenes-lista {
        gap: 10px;
    }

    .orden-card {
        padding: 12px;
        border-radius: 6px;
    }

    .orden-info h3 {
        font-size: 1rem;
    }

    .fecha {
        font-size: 0.75rem;
    }

    .badge {
        font-size: 0.75rem;
        padding: 4px 8px;
    }

    .orden-detalles {
        gap: 6px;
    }

    .detalle-item {
        padding: 4px 0;
        font-size: 0.8rem;
        display: flex;
        justify-content: space-between;
    }

    .detalle-item .label {
        font-weight: 600;
        color: #667eea;
    }

    .productos-lista {
        padding: 10px 0;
        margin-top: 8px;
        border-top: 1px solid #ecf0f1;
        padding-top: 10px;
    }

    .productos-lista h4 {
        font-size: 0.9rem;
        margin-bottom: 8px;
    }

    .producto-item {
        padding: 8px 0;
        gap: 8px;
    }

    .prod-info {
        flex: 1;
        gap: 6px;
    }

    .prod-img {
        width: 45px;
        height: 45px;
    }

    .prod-info strong {
        font-size: 0.8rem;
    }

    .cantidad {
        font-size: 0.7rem;
    }

    .prod-precio {
        font-size: 0.85rem;
        min-width: 70px;
        text-align: right;
    }

    .orden-acciones {
        flex-direction: column;
        padding: 10px 0;
        gap: 6px;
        margin-top: 8px;
        border-top: 1px solid #ecf0f1;
        padding-top: 10px;
    }

    .btn-recibo,
    .btn-repetir {
        width: 100%;
        padding: 8px 10px;
        font-size: 0.75rem;
    }

    .sin-ordenes {
        padding: 30px 15px;
        text-align: center;
    }

    .icono {
        font-size: 3rem;
        margin-bottom: 12px;
    }

    .sin-ordenes h2 {
        font-size: 1.1rem;
        margin-bottom: 8px;
    }

    .sin-ordenes p {
        font-size: 0.85rem;
        margin-bottom: 15px;
    }

    .btn-comprar {
        display: block;
        width: 100%;
        padding: 10px;
        font-size: 0.85rem;
    }
}
</style>
