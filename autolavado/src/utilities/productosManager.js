/**
 * Utilidad para cargar y gestionar productos
 * Los productos se cargan desde el archivo JSON en public/datos/productos.json
 */

let productosCache = null

export async function cargarProductos() {
  // Si ya están en caché, devolverlos
  if (productosCache) {
    return productosCache
  }

  try {
    // Intentar cargar desde public/datos/productos.json
    const response = await fetch('/datos/productos.json')
    if (response.ok) {
      productosCache = await response.json()
      return productosCache
    }
  } catch (error) {
    console.warn('No se pudo cargar productos.json desde public/datos/', error)
  }

  // Si falla, retornar productos de ejemplo (fallback)
  productosCache = getProductosDefault()
  return productosCache
}

export function getProductosDefault() {
  return [
    {
      id_hidrobomba: 1,
      nombre: 'PowerJet 2000',
      marca: 'Kärcher',
      precio: 450000,
      cantidad: 6,
      raiting: 4.8,
      imagen: '/imagenesHidrobombas/hidrobomba1.webp',
      id_categoria: 1,
    },
    {
      id_hidrobomba: 2,
      nombre: 'HydroMax Pro',
      marca: 'Bosch',
      precio: 520000,
      cantidad: 5,
      raiting: 4.7,
      imagen: '/imagenesHidrobombas/hidrobomba2.webp',
      id_categoria: 1,
    },
    {
      id_hidrobomba: 3,
      nombre: 'JetClean 1800',
      marca: 'Black+Decker',
      precio: 400000,
      cantidad: 8,
      raiting: 4.5,
      imagen: '/imagenesHidrobombas/hidrobomba3.webp',
      id_categoria: 1,
    },
    {
      id_hidrobomba: 5,
      nombre: 'WaterBlaster 2200',
      marca: 'Makita',
      precio: 550000,
      cantidad: 4,
      raiting: 4.9,
      imagen: '/imagenesHidrobombas/hidrobomba5.avif',
      id_categoria: 1,
    },
    {
      id_hidrobomba: 9,
      nombre: 'MaxWash Ultra',
      marca: 'Goodyear',
      precio: 510000,
      cantidad: 6,
      raiting: 4.7,
      imagen: '/imagenesHidrobombas/hidrobomba9.avif',
      id_categoria: 1,
    },
  ]
}

export async function obtenerProductosPorCategoria(idCategoria) {
  const productos = await cargarProductos()
  return productos.filter((p) => p.id_categoria === idCategoria)
}

export async function obtenerProductoPorId(id) {
  const productos = await cargarProductos()
  return productos.find(
    (p) => p.id_hidrobomba === id || p.id_producto === id
  )
}

export function obtenerCategorias() {
  return [
    {
      id: 1,
      nombre: 'Hidrobombas',
      ruta: '/hidrobombas',
      icono: '💦',
    },
    {
      id: 4,
      nombre: 'Shampoos',
      ruta: '/shampoos',
      icono: '🧼',
    },
    {
      id: 3,
      nombre: 'Pulidoras',
      ruta: '/pulidoras',
      icono: '✨',
    },
    {
      id: 2,
      nombre: 'Pinturas',
      ruta: '/pinturas',
      icono: '🎨',
    },
  ]
}

export function guardarProductosEnLocalStorage(productos) {
  try {
    localStorage.setItem('productos', JSON.stringify(productos))
    productosCache = productos
    return true
  } catch (error) {
    console.error('Error guardando productos en localStorage:', error)
    return false
  }
}

export function cargarProductosDeLocalStorage() {
  try {
    const productos = localStorage.getItem('productos')
    if (productos) {
      productosCache = JSON.parse(productos)
      return productosCache
    }
    return null
  } catch (error) {
    console.error('Error cargando productos de localStorage:', error)
    return null
  }
}
