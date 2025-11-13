import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('carrito')) || [],
  }),

  getters: {
    // Obtener cantidad de items en el carrito
    itemCount: (state) => state.cartItems.length,

    // Obtener cantidad total de productos (sumando cantidades)
    totalQuantity: (state) => 
      state.cartItems.reduce((total, item) => total + (item.cantidad || 1), 0),

    // Obtener total del carrito
    cartTotal: (state) => 
      state.cartItems.reduce((total, item) => {
        const price = Number(item.precio) || 0
        const quantity = Number(item.cantidad) || 1
        return total + (price * quantity)
      }, 0),

    // Obtener subtotal formateado
    formattedTotal: (state) => {
      const total = state.cartItems.reduce((sum, item) => {
        return sum + (Number(item.precio) || 0) * (Number(item.cantidad) || 1)
      }, 0)
      return total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
    },
  },

  actions: {
    // Agregar producto al carrito
    addToCart(producto) {
      // Normalizar el ID del producto
      const idProducto = this.obtenerIdProducto(producto)
      
      // Verificar si el producto ya existe
      const existente = this.cartItems.find(item => 
        this.obtenerIdProducto(item) === idProducto
      )

      if (existente) {
        // Aumentar cantidad si ya existe
        existente.cantidad = (existente.cantidad || 1) + (producto.cantidad || 1)
      } else {
        // Agregar nuevo producto
        const nuevoItem = {
          ...producto,
          cantidad: producto.cantidad || 1,
          id_producto: idProducto,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
        }
        this.cartItems.push(nuevoItem)
      }

      this.guardarCarrito()
      console.log('✅ Producto agregado al carrito:', producto.nombre)
    },

    // Método auxiliar para obtener ID consistente
    obtenerIdProducto(producto) {
      // Si ya tiene id_producto normalizado, usarlo
      if (producto.id_producto && !producto.id_producto.includes('-')) {
        return producto.id_producto
      }
      
      // Si es normalizado (contiene guion), usarlo
      if (producto.id_producto && producto.id_producto.includes('-')) {
        return producto.id_producto
      }
      
      // Sino, crear uno basado en categoría e ID
      const id = producto.id_hidrobomba || producto.id_pulidora || producto.id_shampoo || producto.id_pintura
      return `${producto.id_categoria}-${id}`
    },
    // Eliminar producto del carrito
    removeFromCart(idProducto) {
      const index = this.cartItems.findIndex(item => 
        this.obtenerIdProducto(item) === idProducto
      )

      if (index !== -1) {
        const nombreProducto = this.cartItems[index].nombre
        this.cartItems.splice(index, 1)
        this.guardarCarrito()
        console.log('✅ Producto eliminado del carrito:', nombreProducto)
      }
    },

    // Actualizar cantidad de un producto
    updateQuantity(idProducto, cantidad) {
      const item = this.cartItems.find(item => 
        this.obtenerIdProducto(item) === idProducto
      )

      if (item) {
        const nuevaCantidad = Number(cantidad)
        if (nuevaCantidad <= 0) {
          this.removeFromCart(idProducto)
        } else {
          item.cantidad = nuevaCantidad
          this.guardarCarrito()
          console.log('✅ Cantidad actualizada:', item.nombre, 'x' + nuevaCantidad)
        }
      }
    },

    // Limpiar todo el carrito
    clearCart() {
      this.cartItems = []
      this.guardarCarrito()
      console.log('✅ Carrito vaciado')
    },

    // Guardar carrito en localStorage
    guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(this.cartItems))
    },

    // Cargar carrito del localStorage
    cargarCarrito() {
      const carritoGuardado = localStorage.getItem('carrito')
      this.cartItems = carritoGuardado ? JSON.parse(carritoGuardado) : []
    },

    // Finalizar compra
    finalizarCompra(datosCompra = {}) {
      if (this.cartItems.length === 0) {
        return { success: false, mensaje: 'El carrito está vacío' }
      }

      try {
        // Obtener usuario actual
        const usuarioJSON = localStorage.getItem('user')
        const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null

        if (!usuario) {
          return { success: false, mensaje: 'Debes iniciar sesión para comprar' }
        }

        // Crear orden
        const orden = {
          idOrden: Date.now(),
          idUsuario: usuario.idUsuario,
          usuario: usuario.usuario,
          email: usuario.email,
          productos: [...this.cartItems],
          total: this.cartTotal,
          fecha: new Date().toISOString(),
          estado: 'pendiente',
          datosEnvio: datosCompra.datosEnvio || {},
          metodoPago: datosCompra.metodoPago || 'pendiente',
        }

        // Actualizar inventario - Restar productos del catálogo
        this.actualizarInventario(this.cartItems)

        // Guardar orden en localStorage
        const ordenesJSON = localStorage.getItem('ordenes')
        const ordenes = ordenesJSON ? JSON.parse(ordenesJSON) : []
        ordenes.push(orden)
        localStorage.setItem('ordenes', JSON.stringify(ordenes))

        // Limpiar carrito
        this.clearCart()

        console.log('✅ Compra finalizada:', orden.idOrden)
        return {
          success: true,
          mensaje: 'Compra realizada exitosamente',
          orden: orden,
        }
      } catch (error) {
        console.error('❌ Error al finalizar compra:', error)
        return { success: false, mensaje: 'Error al procesar la compra' }
      }
    },

    // Actualizar inventario después de la compra
    actualizarInventario(productosComprados) {
      try {
        const productosJSON = localStorage.getItem('productos')
        let productos = productosJSON ? JSON.parse(productosJSON) : []

        console.log('🔍 Productos a actualizar:', productosComprados)
        console.log('📦 Total de productos en catálogo:', productos.length)

        // Restar la cantidad de cada producto comprado
        productosComprados.forEach(productoComprado => {
          console.log('🔎 Buscando producto:', {
            id_categoria: productoComprado.id_categoria,
            id_hidrobomba: productoComprado.id_hidrobomba,
            id_pintura: productoComprado.id_pintura,
            id_pulidora: productoComprado.id_pulidora,
            id_shampoo: productoComprado.id_shampoo,
            id_producto: productoComprado.id_producto,
          })

          // Buscar por el ID correspondiente según la categoría
          const indice = productos.findIndex(p => {
            if (productoComprado.id_categoria === 1 && productoComprado.id_hidrobomba) {
              return p.id_categoria === 1 && p.id_hidrobomba === productoComprado.id_hidrobomba
            }
            if (productoComprado.id_categoria === 2 && productoComprado.id_pintura) {
              return p.id_categoria === 2 && p.id_pintura === productoComprado.id_pintura
            }
            if (productoComprado.id_categoria === 3 && productoComprado.id_pulidora) {
              return p.id_categoria === 3 && p.id_pulidora === productoComprado.id_pulidora
            }
            if (productoComprado.id_categoria === 4 && productoComprado.id_shampoo) {
              return p.id_categoria === 4 && p.id_shampoo === productoComprado.id_shampoo
            }
            return false
          })

          if (indice !== -1) {
            const cantidadAnterior = productos[indice].cantidad
            const nuevaCantidad = Math.max(0, productos[indice].cantidad - productoComprado.cantidad)
            productos[indice].cantidad = nuevaCantidad
            console.log(`✅ ${productos[indice].nombre}: ${cantidadAnterior} → ${nuevaCantidad} unidades`)
          } else {
            console.warn(`⚠️ Producto NO encontrado en catálogo:`, productoComprado.nombre)
          }
        })

        // Guardar productos actualizados
        localStorage.setItem('productos', JSON.stringify(productos))
        console.log('✅ Inventario actualizado completamente')
      } catch (error) {
        console.error('❌ Error actualizando inventario:', error)
      }
    },

    // Obtener historial de compras del usuario
    obtenerHistorial() {
      const usuarioJSON = localStorage.getItem('user')
      const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null

      if (!usuario) return []

      const ordenesJSON = localStorage.getItem('ordenes')
      const ordenes = ordenesJSON ? JSON.parse(ordenesJSON) : []

      return ordenes.filter(orden => orden.idUsuario === usuario.idUsuario)
    },
  },
})