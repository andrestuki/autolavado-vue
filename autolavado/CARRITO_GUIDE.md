# 🛒 Sistema de Carrito Funcional

## 📋 Resumen

Se ha creado un **sistema de carrito completamente funcional** que se integra perfectamente con la autenticación y el almacenamiento en localStorage. Sin necesidad de backend.

---

## ✨ Características Implementadas

### 1. **Store del Carrito (Pinia)**
- ✅ Agregar productos
- ✅ Eliminar productos
- ✅ Actualizar cantidad
- ✅ Calcular totales automáticamente
- ✅ Almacenamiento persistente en localStorage
- ✅ Finalizar compra y crear órdenes
- ✅ Ver historial de compras

### 2. **Vista del Carrito (CarritoView.vue)**
- ✅ Tabla interactiva de productos
- ✅ Controles para modificar cantidad (+ y -)
- ✅ Eliminación de productos
- ✅ Cálculo automático de subtotales
- ✅ Opciones de envío (Gratis, Domicilio, Express)
- ✅ Cálculo de impuestos (19%)
- ✅ Resumen de precios en panel lateral
- ✅ Modal de confirmación de compra
- ✅ Diseño moderno y responsivo

### 3. **Vista de Órdenes (OrdenesView.vue)**
- ✅ Listado de órdenes del usuario
- ✅ Detalles de cada orden
- ✅ Descarga de recibos en texto
- ✅ Opción de repetir compra
- ✅ Filtrado por usuario

---

## 🔄 Flujo de Compra

```
1. Usuario navega y agrega productos al carrito
   ↓
2. Va a /carrito (ver carrito)
   ↓
3. Revisa productos y modifica cantidades
   ↓
4. Selecciona tipo de envío
   ↓
5. Hace clic en "Finalizar Compra"
   ↓
6. Se valida que esté logeado
   ↓
7. Se crea la orden y se guarda en localStorage
   ↓
8. Se limpia el carrito
   ↓
9. Se muestra modal de confirmación
   ↓
10. Puede continuar comprando o ver órdenes
```

---

## 💾 Estructura de Datos en localStorage

### Array de Productos en Carrito
```json
{
  "carrito": [
    {
      "id_producto": 1,
      "id_hidrobomba": 1,
      "nombre": "PowerJet 2000",
      "marca": "Kärcher",
      "precio": 450000,
      "cantidad": 2,
      "imagen": "/imagenesHidrobombas/hidrobomba1.webp"
    }
  ]
}
```

### Array de Órdenes
```json
{
  "ordenes": [
    {
      "idOrden": 1731308400000,
      "idUsuario": 1,
      "usuario": "john_doe",
      "email": "john@example.com",
      "productos": [
        {
          "id_producto": 1,
          "nombre": "PowerJet 2000",
          "precio": 450000,
          "cantidad": 2
        }
      ],
      "total": 900000,
      "fecha": "2025-11-11T10:30:00.000Z",
      "estado": "pendiente",
      "datosEnvio": {
        "tipo": "domicilio",
        "costo": 20000
      },
      "metodoPago": "tarjeta"
    }
  ]
}
```

---

## 🔌 API del Store (useCartStore)

### Getters
```javascript
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// Cantidad de items
cartStore.itemCount          // Número total de artículos

// Cantidad total (sumando cantidades)
cartStore.totalQuantity      // Total de productos considerando cantidad

// Total del carrito
cartStore.cartTotal          // Suma de (precio × cantidad)

// Total formateado
cartStore.formattedTotal     // String con formato de moneda
```

### Acciones
```javascript
// Agregar producto
cartStore.addToCart({
  id_hidrobomba: 1,
  nombre: "PowerJet 2000",
  precio: 450000,
  imagen: "/imagenesHidrobombas/hidrobomba1.webp",
  cantidad: 1
})

// Eliminar producto
cartStore.removeFromCart(idProducto)

// Actualizar cantidad
cartStore.updateQuantity(idProducto, nuevaCantidad)

// Limpiar carrito
cartStore.clearCart()

// Guardar en localStorage
cartStore.guardarCarrito()

// Cargar desde localStorage
cartStore.cargarCarrito()

// Finalizar compra
const resultado = cartStore.finalizarCompra({
  datosEnvio: { tipo: 'domicilio', costo: 20000 },
  metodoPago: 'tarjeta'
})
// Retorna: { success: true/false, mensaje: string, orden: {...} }

// Obtener historial de compras
const ordenes = cartStore.obtenerHistorial()
```

---

## 📱 Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/carrito` | CarritoView | Ver carrito de compras |
| `/cart` | CarritoView | Alias de /carrito |
| `/ordenes` | OrdenesView | Ver historial de órdenes |

---

## 🎨 Componentes

### CarritoView.vue
**Ubicación:** `src/views/CarritoView.vue`

**Características:**
- Tabla interactiva de productos
- Controles para cantidad (+ y -)
- Eliminación de productos
- Opciones de envío
- Cálculo automático de impuestos
- Resumen lateral con total
- Modal de confirmación

**Props:** Ninguno (usa el store)

**Eventos:** Enruta a `/` o `/ordenes`

### OrdenesView.vue
**Ubicación:** `src/views/OrdenesView.vue`

**Características:**
- Listado de órdenes del usuario
- Detalles de cada orden
- Descarga de recibo
- Opción de repetir compra

**Props:** Ninguno (usa el store)

**Eventos:** Enruta a `/carrito` o `/`

---

## 🔌 Integración con Productos

Para agregar un producto al carrito desde cualquier componente:

```javascript
import { useCartStore } from '@/stores/cart'

export default {
  methods: {
    agregarAlCarrito(producto) {
      const cartStore = useCartStore()
      
      cartStore.addToCart({
        id_hidrobomba: producto.id_hidrobomba,
        id_producto: producto.id_hidrobomba, // Si usas otro ID
        nombre: producto.nombre,
        marca: producto.marca,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
      })
      
      alert('✅ Producto agregado al carrito')
      // O enrutar a carrito:
      // this.$router.push('/carrito')
    }
  }
}
```

---

## 🧪 Casos de Prueba

### Caso 1: Agregar producto
```
1. Ir a página de productos
2. Hacer clic en "Agregar al carrito"
→ El producto se agrega correctamente
```

### Caso 2: Ver carrito
```
1. Ir a /carrito
2. Carrito debe mostrar productos agregados
→ Se muestran correctamente con precios y cantidades
```

### Caso 3: Modificar cantidad
```
1. En /carrito, hacer clic en + o -
2. La cantidad debe cambiar
3. El subtotal debe actualizarse automáticamente
→ Funciona correctamente
```

### Caso 4: Eliminar producto
```
1. En /carrito, hacer clic en botón "Eliminar"
2. Confirmar eliminación
→ El producto desaparece del carrito
```

### Caso 5: Finalizar compra SIN login
```
1. Carrito con productos
2. Sin estar logeado, hacer clic en "Finalizar Compra"
→ Redirige a /login
```

### Caso 6: Finalizar compra CON login
```
1. Estar logeado
2. Carrito con productos
3. Seleccionar tipo de envío
4. Hacer clic en "Finalizar Compra"
→ Muestra modal de confirmación
→ Orden se guarda en localStorage
→ Carrito se limpia
```

### Caso 7: Ver órdenes
```
1. Estar logeado
2. Realizar una compra
3. Ir a /ordenes
→ Se muestra la orden realizada
```

### Caso 8: Descargar recibo
```
1. En /ordenes
2. Hacer clic en "Descargar Recibo"
→ Se descarga un archivo recibo-{idOrden}.txt
```

### Caso 9: Repetir compra
```
1. En /ordenes
2. Hacer clic en "Repetir Compra"
→ Los productos se agregan al carrito
→ Enruta a /carrito
```

---

## 📊 Cálculos Automáticos

### Subtotal
```
Subtotal = Suma de (Precio Unitario × Cantidad)
```

### Impuesto
```
Impuesto = Subtotal × 19%
```

### Envío
```
- Gratis: $0
- Domicilio: $20.000
- Express: $50.000
```

### Total
```
Total = Subtotal + Impuesto + Envío
```

---

## 🔐 Validaciones

✅ No permitir carrito vacío en checkout
✅ Requerir login para finalizar compra
✅ Validar cantidad > 0
✅ Guardar automáticamente en localStorage
✅ Filtrar órdenes por usuario logeado

---

## 📋 Archivos Modificados

1. **src/stores/cart.js** - Store completamente reescrito
2. **src/views/CarritoView.vue** - Reescrito de cero
3. **src/router/index.js** - Agregadas rutas `/carrito` y `/ordenes`

---

## 🆕 Archivos Creados

1. **src/views/OrdenesView.vue** - Nueva vista de órdenes

---

## ⚠️ Notas Importantes

1. **localStorage limitado:** ~5-10 MB máximo
2. **Sin backend:** Todo funciona localmente
3. **Datos persistentes:** Se pierden si el usuario limpia localStorage
4. **Sincronización:** Automática entre tabs/ventanas del mismo navegador

---

## 🚀 Próximos Pasos

Si deseas agregar backend:

1. Crear endpoint POST `/api/carrito/agregar`
2. Crear endpoint DELETE `/api/carrito/eliminar/{id}`
3. Crear endpoint POST `/api/ordenes/crear`
4. Crear endpoint GET `/api/ordenes/{idUsuario}`
5. Actualizar los métodos del store

---

## 🎯 Resumen Rápido

| Acción | Método | Ubicación |
|--------|--------|-----------|
| Agregar al carrito | `cartStore.addToCart(producto)` | Cualquier componente |
| Ver carrito | Ir a `/carrito` | CarritoView.vue |
| Finalizar compra | Botón en CarritoView | Crea orden en localStorage |
| Ver órdenes | Ir a `/ordenes` | OrdenesView.vue |
| Obtener total | `cartStore.cartTotal` | Store |
| Contar items | `cartStore.itemCount` | Store |

---

**¡Sistema de carrito completamente funcional! 🎉**

Ahora puedes:
1. ✅ Agregar productos al carrito
2. ✅ Modificar cantidades
3. ✅ Ver resumen de compra
4. ✅ Finalizar compra
5. ✅ Ver historial de órdenes
6. ✅ Descargar recibos
7. ✅ Repetir compras anteriores
