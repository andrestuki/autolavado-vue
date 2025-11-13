import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('carrito')) || [],
    ultimaRutaCompra: localStorage.getItem('ultimaRutaCompra') || '/inicio',
  }),

  getters: {
    itemCount: (state) => state.cartItems.length,

    totalQuantity: (state) => 
      state.cartItems.reduce((total, item) => total + (item.cantidad || 1), 0),

    cartTotal: (state) => 
      state.cartItems.reduce((total, item) => {
        const price = Number(item.precio) || 0
        const quantity = Number(item.cantidad) || 1
        return total + (price * quantity)
      }, 0),

    formattedTotal: (state) => {
      const total = state.cartItems.reduce((sum, item) => {
        return sum + (Number(item.precio) || 0) * (Number(item.cantidad) || 1)
      }, 0)
      return total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
    },
  },

  actions: {
    obtenerStockDisponible(producto) {
      try {
        const productosJSON = localStorage.getItem('productos')
        const productos = productosJSON ? JSON.parse(productosJSON) : []
        const idProducto = this.obtenerIdProducto(producto)

        // Función auxiliar para obtener ID de producto
        const obtenerIdProductoLocal = (p) => {
          if (p.id_producto && p.id_producto.includes('-')) {
            return p.id_producto
          }
          const id = p.id_hidrobomba || p.id_pulidora || p.id_shampoo || p.id_pintura
          return `${p.id_categoria}-${id}`
        }

        const productoEnCatalogo = productos.find(p => {
          const idCatalogo = obtenerIdProductoLocal(p)
          return idCatalogo === idProducto
        })

        if (productoEnCatalogo) {
          return Number(productoEnCatalogo.cantidad) || 0
        }

        const productoAlternativo = productos.find(p => {
          if (producto.id_categoria === 1 && producto.id_hidrobomba) {
            return p.id_categoria === 1 && p.id_hidrobomba === producto.id_hidrobomba
          }
          if (producto.id_categoria === 2 && producto.id_pintura) {
            return p.id_categoria === 2 && p.id_pintura === producto.id_pintura
          }
          if (producto.id_categoria === 3 && producto.id_pulidora) {
            return p.id_categoria === 3 && p.id_pulidora === producto.id_pulidora
          }
          if (producto.id_categoria === 4 && producto.id_shampoo) {
            return p.id_categoria === 4 && p.id_shampoo === producto.id_shampoo
          }
          return false
        })

        return productoAlternativo ? (Number(productoAlternativo.cantidad) || 0) : 0
      } catch (error) {
        console.error('Error obteniendo stock:', error)
        return 0
      }
    },

    addToCart(producto) {
      const idProducto = this.obtenerIdProducto(producto)
      
      const stockDisponible = this.obtenerStockDisponible(producto)
      
      if (stockDisponible <= 0) {
        return { 
          success: false, 
          mensaje: `El producto "${producto.nombre}" está agotado` 
        }
      }

      const existente = this.cartItems.find(item => 
        this.obtenerIdProducto(item) === idProducto
      )

      const cantidadAAgregar = Number(producto.cantidad) || 1
      const cantidadActualEnCarrito = existente ? (Number(existente.cantidad) || 0) : 0
      const nuevaCantidadTotal = cantidadActualEnCarrito + cantidadAAgregar

      if (nuevaCantidadTotal > stockDisponible) {
        return { 
          success: false, 
          mensaje: `Solo hay ${stockDisponible} unidades disponibles de "${producto.nombre}". Ya tienes ${cantidadActualEnCarrito} en el carrito.` 
        }
      }

      if (existente) {
        existente.cantidad = nuevaCantidadTotal
      } else {
        const nuevoItem = {
          ...producto,
          cantidad: cantidadAAgregar,
          id_producto: idProducto,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
        }
        this.cartItems.push(nuevoItem)
      }

      this.guardarCarrito()
      
      if (typeof window !== 'undefined' && window.location) {
        const rutaActual = window.location.pathname
        if (rutaActual.includes('/pinturas') || rutaActual.includes('/hidrobombas') || 
            rutaActual.includes('/pulidoras') || rutaActual.includes('/shampoos')) {
          this.ultimaRutaCompra = rutaActual
          localStorage.setItem('ultimaRutaCompra', rutaActual)
        }
      }
      
      console.log('Producto agregado al carrito:', producto.nombre)
      return { success: true, mensaje: 'Producto agregado al carrito' }
    },

    obtenerIdProducto(producto) {
      if (producto.id_producto && !producto.id_producto.includes('-')) {
        return producto.id_producto
      }
      
      if (producto.id_producto && producto.id_producto.includes('-')) {
        return producto.id_producto
      }
      
      const id = producto.id_hidrobomba || producto.id_pulidora || producto.id_shampoo || producto.id_pintura
      return `${producto.id_categoria}-${id}`
    },
    removeFromCart(idProducto) {
      const index = this.cartItems.findIndex(item => 
        this.obtenerIdProducto(item) === idProducto
      )

      if (index !== -1) {
        const nombreProducto = this.cartItems[index].nombre
        this.cartItems.splice(index, 1)
        this.guardarCarrito()
        console.log('Producto eliminado del carrito:', nombreProducto)
      }
    },

    updateQuantity(idProducto, cantidad) {
      const item = this.cartItems.find(item => 
        this.obtenerIdProducto(item) === idProducto
      )

      if (!item) {
        return { success: false, mensaje: 'Producto no encontrado en el carrito' }
      }

      const nuevaCantidad = Number(cantidad)
      
      if (nuevaCantidad <= 0) {
        this.removeFromCart(idProducto)
        return { success: true, mensaje: 'Producto eliminado del carrito' }
      }

      const stockDisponible = this.obtenerStockDisponible(item)
      
      if (nuevaCantidad > stockDisponible) {
        return { 
          success: false, 
          mensaje: `Solo hay ${stockDisponible} unidades disponibles de "${item.nombre}"` 
        }
      }

      item.cantidad = nuevaCantidad
      this.guardarCarrito()
      console.log('Cantidad actualizada:', item.nombre, 'x' + nuevaCantidad)
      return { success: true, mensaje: 'Cantidad actualizada' }
    },

    clearCart() {
      this.cartItems = []
      this.guardarCarrito()
      console.log('Carrito vaciado')
    },

    guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(this.cartItems))
    },

    cargarCarrito() {
      const carritoGuardado = localStorage.getItem('carrito')
      this.cartItems = carritoGuardado ? JSON.parse(carritoGuardado) : []
    },

    finalizarCompra(datosCompra = {}) {
      if (this.cartItems.length === 0) {
        return { success: false, mensaje: 'El carrito está vacío' }
      }

      try {
        const usuarioJSON = localStorage.getItem('user')
        const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null

        if (!usuario) {
          return { success: false, mensaje: 'Debes iniciar sesión para comprar' }
        }

        const productosSinStock = []
        for (const item of this.cartItems) {
          const stockDisponible = this.obtenerStockDisponible(item)
          const cantidadSolicitada = Number(item.cantidad) || 1
          
          if (stockDisponible < cantidadSolicitada) {
            productosSinStock.push({
              nombre: item.nombre,
              disponible: stockDisponible,
              solicitado: cantidadSolicitada
            })
          }
        }

        if (productosSinStock.length > 0) {
          const mensaje = productosSinStock.map(p => 
            `"${p.nombre}": solo hay ${p.disponible} disponibles (solicitaste ${p.solicitado})`
          ).join(', ')
          return { 
            success: false, 
            mensaje: `Stock insuficiente: ${mensaje}` 
          }
        }

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

        this.actualizarInventario(this.cartItems)

        const ordenesJSON = localStorage.getItem('ordenes')
        const ordenes = ordenesJSON ? JSON.parse(ordenesJSON) : []
        ordenes.push(orden)
        localStorage.setItem('ordenes', JSON.stringify(ordenes))

        this.clearCart()

        console.log('Compra finalizada:', orden.idOrden)
        return {
          success: true,
          mensaje: 'Compra realizada exitosamente',
          orden: orden,
        }
      } catch (error) {
        console.error('Error al finalizar compra:', error)
        return { success: false, mensaje: 'Error al procesar la compra' }
      }
    },

    actualizarInventario(productosComprados) {
      try {
        const productosJSON = localStorage.getItem('productos')
        let productos = productosJSON ? JSON.parse(productosJSON) : []

        console.log('Productos a actualizar:', productosComprados)
        console.log('Total de productos en catálogo:', productos.length)

        const obtenerIdProductoLocal = (producto) => {
          if (producto.id_producto && !producto.id_producto.includes('-')) {
            return producto.id_producto
          }
          if (producto.id_producto && producto.id_producto.includes('-')) {
            return producto.id_producto
          }
          const id = producto.id_hidrobomba || producto.id_pulidora || producto.id_shampoo || producto.id_pintura
          return `${producto.id_categoria}-${id}`
        }

        productosComprados.forEach(productoComprado => {
          const cantidadComprada = Number(productoComprado.cantidad) || 1
          let productoEncontrado = null
          let indice = -1

          if (productoComprado.id_producto) {
            indice = productos.findIndex(p => {
              if (p.id_producto === productoComprado.id_producto) {
                return true
              }
              const idProductoCatalogo = obtenerIdProductoLocal(p)
              return idProductoCatalogo === productoComprado.id_producto
            })
          }

          if (indice === -1) {
            indice = productos.findIndex(p => {
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
          }

          if (indice !== -1) {
            productoEncontrado = productos[indice]
            const cantidadAnterior = Number(productoEncontrado.cantidad) || 0
            const nuevaCantidad = Math.max(0, cantidadAnterior - cantidadComprada)
            
            productos[indice].cantidad = nuevaCantidad
            
            console.log(`${productoEncontrado.nombre}: ${cantidadAnterior} → ${nuevaCantidad} unidades (compradas: ${cantidadComprada})`)
          } else {
            console.warn(`Producto NO encontrado en catálogo:`, {
              nombre: productoComprado.nombre,
              id_producto: productoComprado.id_producto,
              id_categoria: productoComprado.id_categoria,
            })
          }
        })

        localStorage.setItem('productos', JSON.stringify(productos))
        console.log('Inventario actualizado completamente en localStorage')
      } catch (error) {
        console.error('Error actualizando inventario:', error)
      }
    },

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