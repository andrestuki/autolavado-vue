<template>
  <div class="carrito-container">
    <div class="carrito-header">
      <h1>Mi Carrito</h1>
      <router-link to="/" class="btn-volver">← Volver a compras</router-link>
    </div>

    <div v-if="cartStore.itemCount === 0" class="carrito-vacio">
      <div class="icono-vacio"></div>
      <h2>Tu carrito está vacío</h2>
      <p>¡Agrega productos para empezar a comprar!</p>
      <a href="#" @click.prevent="irATienda" class="btn-comprar">Ir a Comprar</a>
    </div>

    <div v-else class="carrito-contenido">
      <div class="tabla-wrapper">
        <table class="tabla-carrito">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.cartItems" :key="obtenerIdProducto(item)">
              <td class="producto-info" data-label="Producto">
                <img v-if="item.imagen" :src="item.imagen" :alt="item.nombre" class="producto-img" />
                <div class="producto-detalles">
                  <strong>{{ item.nombre }}</strong>
                  <p v-if="item.marca" class="marca">{{ item.marca }}</p>
                </div>
              </td>
              <td class="precio" data-label="Precio">${{ Number(item.precio).toLocaleString('es-CO') }}</td>
              <td class="cantidad" data-label="Cantidad">
                <div class="cantidad-control">
                  <button @click="decrementarCantidad(obtenerIdProducto(item))" class="btn-cantidad">−</button>
                  <input 
                    type="number" 
                    :value="item.cantidad" 
                    @change="actualizarCantidad(obtenerIdProducto(item), $event)"
                    min="1"
                    class="input-cantidad"
                  />
                  <button @click="incrementarCantidad(obtenerIdProducto(item))" class="btn-cantidad">+</button>
                </div>
              </td>
              <td class="subtotal" data-label="Subtotal">${{ (Number(item.precio) * item.cantidad).toLocaleString('es-CO') }}</td>
              <td class="accion" data-label="Acción">
                <button @click="eliminarProducto(obtenerIdProducto(item))" class="btn-eliminar" title="Eliminar">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="carrito-resumen">
        <div class="resumen-detalles">
          <div class="linea-resumen">
            <span>Subtotal:</span>
            <span>${{ cartStore.cartTotal.toLocaleString('es-CO') }}</span>
          </div>
          <div class="linea-resumen">
            <span>Impuesto (19%):</span>
            <span>${{ (cartStore.cartTotal * 0.19).toLocaleString('es-CO') }}</span>
          </div>
          <div class="linea-resumen envio">
            <span>Envío:</span>
            <span>${{ montoEnvio.toLocaleString('es-CO') }}</span>
          </div>
          <div class="linea-resumen total">
            <span>TOTAL:</span>
            <span>${{ montoTotal.toLocaleString('es-CO') }}</span>
          </div>
        </div>

        <div class="opciones-envio">
          <h4>Tipo de Envío</h4>
          <label class="radio-opcion">
            <input v-model="tipoEnvio" value="gratis" type="radio" />
            <span>Envío a Sucursal (Gratis) - 5-7 días</span>
          </label>
          <label class="radio-opcion">
            <input v-model="tipoEnvio" value="domicilio" type="radio" />
            <span>Envío a Domicilio ($20.000) - 2-3 días</span>
          </label>
          <label class="radio-opcion">
            <input v-model="tipoEnvio" value="express" type="radio" />
            <span>Envío Express ($50.000) - 1 día</span>
          </label>
        </div>

        <div class="acciones">
          <button @click="limpiarCarrito" class="btn-limpiar">Limpiar Carrito</button>
          <button @click="finalizarCompra" class="btn-comprar" :disabled="procesando">
            {{ procesando ? 'Procesando...' : 'Finalizar Compra' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>Compra Realizada</h2>
          <button @click="cerrarModal" class="btn-cerrar">X</button>
        </div>
        <div class="modal-body">
          <p><strong>Número de Orden:</strong> #{{ ultimaOrden?.idOrden }}</p>
          <p><strong>Total:</strong> ${{ Number(ultimaOrden?.total).toLocaleString('es-CO') }}</p>
          <p><strong>Fecha:</strong> {{ formatearFecha(ultimaOrden?.fecha) }}</p>
          <p><strong>Estado:</strong> <span class="badge-pendiente">{{ ultimaOrden?.estado }}</span></p>
          <div class="productos-resumen">
            <h4>Productos:</h4>
            <ul>
              <li v-for="prod in ultimaOrden?.productos" :key="prod.id_producto">
                {{ prod.nombre }} x{{ prod.cantidad }} - ${{ (Number(prod.precio) * prod.cantidad).toLocaleString('es-CO') }}
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <router-link :to="rutaContinuarComprando" class="btn-modal">Continuar Comprando</router-link>
          <router-link to="/ordenes" class="btn-modal btn-secundario">Ver Mis Órdenes</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'CarritoView',
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      cartStore: useCartStore(),
      authStore: useAuthStore(),
      tipoEnvio: 'gratis',
      mostrarModal: false,
      ultimaOrden: null,
      procesando: false,
    }
  },
  computed: {
    montoEnvio() {
      const costos = {
        gratis: 0,
        domicilio: 20000,
        express: 50000,
      }
      return costos[this.tipoEnvio] || 0
    },
    montoTotal() {
      const impuesto = this.cartStore.cartTotal * 0.19
      return this.cartStore.cartTotal + impuesto + this.montoEnvio
    },
    rutaContinuarComprando() {
      return this.cartStore.ultimaRutaCompra || '/inicio'
    },
  },
  methods: {
    incrementarCantidad(idProducto) {
      const item = this.cartStore.cartItems.find(i => this.obtenerIdProducto(i) === idProducto)
      if (item) {
        const resultado = this.cartStore.updateQuantity(idProducto, item.cantidad + 1)
        if (!resultado.success) {
          alert(resultado.mensaje)
        }
      }
    },
    decrementarCantidad(idProducto) {
      const item = this.cartStore.cartItems.find(i => this.obtenerIdProducto(i) === idProducto)
      if (item && item.cantidad > 1) {
        const resultado = this.cartStore.updateQuantity(idProducto, item.cantidad - 1)
        if (!resultado.success) {
          alert(resultado.mensaje)
        }
      }
    },
    actualizarCantidad(idProducto, event) {
      const nuevaCantidad = Number(event.target.value)
      if (nuevaCantidad > 0) {
        const resultado = this.cartStore.updateQuantity(idProducto, nuevaCantidad)
        if (!resultado.success) {
          alert(resultado.mensaje)
          const item = this.cartStore.cartItems.find(i => this.obtenerIdProducto(i) === idProducto)
          if (item) {
            event.target.value = item.cantidad
          }
        }
      }
    },
    eliminarProducto(idProducto) {
      const item = this.cartStore.cartItems.find(i => this.obtenerIdProducto(i) === idProducto)
      if (item && confirm(`¿Eliminar ${item.nombre} del carrito?`)) {
        this.cartStore.removeFromCart(idProducto)
      }
    },
    obtenerIdProducto(producto) {
      if (producto.id_producto && producto.id_producto.includes('-')) {
        return producto.id_producto
      }
      
      const id = producto.id_hidrobomba || producto.id_pulidora || producto.id_shampoo || producto.id_pintura
      return `${producto.id_categoria}-${id}`
    },
    limpiarCarrito() {
      if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        this.cartStore.clearCart()
      }
    },
    finalizarCompra() {
      if (!this.authStore.isLoggedIn) {
        alert('Debes iniciar sesión para comprar')
        this.$router.push('/login')
        return
      }

      this.procesando = true

      setTimeout(() => {
        const resultado = this.cartStore.finalizarCompra({
          datosEnvio: {
            tipo: this.tipoEnvio,
            costo: this.montoEnvio,
          },
          metodoPago: 'tarjeta',
        })

        if (resultado.success) {
          this.ultimaOrden = resultado.orden
          this.mostrarModal = true
          console.log('Compra finalizada:', resultado.orden)
          
          window.dispatchEvent(new CustomEvent('productosActualizados'))
        } else {
          alert(resultado.mensaje)
        }

        this.procesando = false
      }, 1000)
    },
    cerrarModal() {
      this.mostrarModal = false
      this.$router.push(this.rutaContinuarComprando)
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
    irATienda() {
      if (this.router.currentRoute.value.path === '/inicio' || this.router.currentRoute.value.path === '/') {
        const seccionProductos = document.getElementById('tienda-productos');
        if (seccionProductos) {
          seccionProductos.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        this.router.push('/inicio').then(() => {
          setTimeout(() => {
            const seccionProductos = document.getElementById('tienda-productos');
            if (seccionProductos) {
              seccionProductos.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        });
      }
    },
  },
  mounted() {
    this.cartStore.cargarCarrito()
  },
}
</script>

<style scoped>
.carrito-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e2c3c3 100%);
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.carrito-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.carrito-header h1 {
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

/* Carrito Vacío */
.carrito-vacio {
  max-width: 500px;
  margin: 60px auto;
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.icono-vacio {
  font-size: 80px;
  margin-bottom: 20px;
}

.carrito-vacio h2 {
  color: #333;
  margin: 20px 0;
}

.carrito-vacio p {
  color: #777;
  font-size: 16px;
  margin-bottom: 30px;
}

/* Carrito con Contenido */
.carrito-contenido {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
}

/* Tabla */
.tabla-wrapper {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.tabla-carrito {
  width: 100%;
  border-collapse: collapse;
}

.tabla-carrito th {
  background: linear-gradient(135deg, #ac1616 0%, #c51b1b 100%);
  color: white;
  padding: 16px;
  text-align: left;
  font-weight: 600;
}

.tabla-carrito td {
  padding: 16px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.tabla-carrito tbody tr:hover {
  background: #f9f9f9;
}

.producto-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.producto-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.producto-detalles {
  flex: 1;
}

.producto-detalles strong {
  display: block;
  color: #333;
  margin-bottom: 4px;
}

.marca {
  color: #999;
  font-size: 12px;
  margin: 0;
}

.precio {
  font-weight: 600;
  color: #ea6666;
  white-space: nowrap;
}

.cantidad {
  width: 140px;
}

.cantidad-control {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 4px;
}

.btn-cantidad {
  width: 30px;
  height: 30px;
  border: none;
  background: white;
  color: #f15757;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}

.btn-cantidad:hover {
  background: #667eea;
  color: white;
}

.input-cantidad {
  width: 40px;
  border: none;
  background: transparent;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

.subtotal {
  font-weight: 600;
  color: #27ae60;
}

.accion {
  text-align: center;
}

.btn-eliminar {
  padding: 8px 12px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
}

.btn-eliminar:hover {
  background: #c0392b;
  transform: scale(1.05);
}

/* Resumen Lateral */
.carrito-resumen {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.resumen-detalles {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.linea-resumen {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #666;
}

.linea-resumen span:last-child {
  font-weight: 600;
  color: #333;
}

.linea-resumen.total {
  border: none;
  padding-top: 12px;
  margin-top: 12px;
  margin-bottom: 0;
  border-top: 2px solid #e70a0a;
  font-size: 18px;
  color: #b90000;
}

.opciones-envio {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.opciones-envio h4 {
  margin-top: 0;
  color: #333;
}

.radio-opcion {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  cursor: pointer;
  font-size: 13px;
  color: #666;
}

.radio-opcion input {
  cursor: pointer;
}

.acciones {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-limpiar {
  padding: 12px;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-limpiar:hover {
  background: #7f8c8d;
}

.btn-comprar {
  padding: 14px;
  background: linear-gradient(135deg, #e62006 0%, #a50808 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.btn-comprar:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 0, 0, 0.4);
}

.btn-comprar:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #27ae60;
}

.btn-cerrar {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-body p {
  margin: 10px 0;
  color: #666;
}

.badge-pendiente {
  background: #f39c12;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.productos-resumen {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.productos-resumen h4 {
  margin-top: 0;
  color: #333;
}

.productos-resumen ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.productos-resumen li {
  padding: 8px 0;
  color: #666;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.btn-modal {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-modal:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-modal.btn-secundario {
  background: #95a5a6;
}

.btn-modal.btn-secundario:hover {
  background: #7f8c8d;
}

/* Responsive */
@media (max-width: 1200px) {
  .tabla-carrito th,
  .tabla-carrito td {
    padding: 12px;
  }

  .tabla-carrito {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .carrito-container {
    padding: 20px 15px;
  }

  .carrito-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
    margin-bottom: 25px;
  }

  .carrito-header h1 {
    font-size: 1.6rem;
  }

  .btn-volver {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .carrito-contenido {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .tabla-wrapper {
    overflow-x: auto;
  }

  .tabla-carrito {
    font-size: 13px;
    min-width: 100%;
  }

  .tabla-carrito th,
  .tabla-carrito td {
    padding: 10px;
  }

  .producto-img {
    width: 50px;
    height: 50px;
  }

  .producto-detalles {
    font-size: 0.9rem;
  }

  .cantidad-control {
    gap: 3px;
  }

  .btn-cantidad {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }

  .input-cantidad {
    width: 40px;
    font-size: 0.85rem;
    padding: 4px;
  }

  .resumen-section {
    padding: 15px;
  }

  .resumen-section h2 {
    font-size: 1.3rem;
  }

  .resumen-item {
    font-size: 0.9rem;
    padding: 6px 0;
  }

  .total-final {
    font-size: 1.3rem;
    padding: 8px 0;
  }

  .btn-finalizar {
    padding: 10px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .carrito-container {
    padding: 15px 10px;
  }

  .carrito-header {
    margin-bottom: 20px;
  }

  .carrito-header h1 {
    font-size: 1.3rem;
  }

  .btn-volver {
    width: 100%;
    padding: 10px;
    font-size: 0.85rem;
  }

  .tabla-wrapper {
    margin: 0 -10px;
  }

  .tabla-carrito {
    font-size: 11px;
  }

  .tabla-carrito th,
  .tabla-carrito td {
    padding: 8px 4px;
  }

  .tabla-carrito thead {
    display: none;
  }

  .tabla-carrito tbody tr {
    display: flex;
    flex-direction: column;
    border: 1px solid #ecf0f1;
    margin-bottom: 15px;
    padding: 12px;
    border-radius: 8px;
    gap: 8px;
  }

  .tabla-carrito td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border: none;
  }

  .tabla-carrito td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #667eea;
    min-width: 80px;
  }

  .tabla-carrito td.producto-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .producto-img {
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
  }

  .producto-detalles {
    font-size: 0.8rem;
    width: 100%;
  }

  .producto-detalles strong {
    display: block;
    margin-bottom: 4px;
  }

  .cantidad-control {
    width: 100%;
    justify-content: space-between;
  }

  .btn-cantidad {
    width: 32px;
    height: 32px;
    font-size: 1rem;
    padding: 0;
  }

  .input-cantidad {
    width: 50px;
    text-align: center;
  }

  .resumen-section {
    padding: 15px 12px;
    margin-top: 10px;
  }

  .resumen-section h2 {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }

  .resumen-item {
    font-size: 0.85rem;
    padding: 5px 0;
  }

  .total-final {
    font-size: 1.2rem;
    padding: 10px 0;
    margin-top: 8px;
  }

  .btn-finalizar {
    width: 100%;
    padding: 12px;
    font-size: 0.9rem;
  }

  .carrito-vacio {
    text-align: center;
    padding: 40px 20px;
  }

  .icono-vacio {
    font-size: 4rem;
    margin-bottom: 15px;
  }

  .carrito-vacio h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .carrito-vacio p {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }

  .btn-comprar {
    display: inline-block;
    width: 100%;
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>