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

@media (max-width: 768px) {
    .ordenes-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .orden-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .orden-detalles {
        grid-template-columns: 1fr;
    }

    .orden-acciones {
        flex-direction: column;
    }
}
</style>
