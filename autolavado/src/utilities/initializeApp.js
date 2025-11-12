/**
 * Script para inicializar datos en localStorage
 * Se ejecuta cuando la aplicación carga por primera vez
 */

import { cargarProductos } from '@/utilities/productosManager'

export async function inicializarDatos() {
  try {
    // Verificar si ya hay datos
    const productosGuardados = localStorage.getItem('productos')
    const usuariosGuardados = localStorage.getItem('usuarios')
    const carritoGuardado = localStorage.getItem('carrito')
    const ordenesGuardadas = localStorage.getItem('ordenes')

    // Si no hay productos, cargarlos
    if (!productosGuardados) {
      console.log('📦 Cargando productos iniciales...')
      const productos = await cargarProductos()
      localStorage.setItem('productos', JSON.stringify(productos))
      console.log(`✅ ${productos.length} productos cargados`)
    }

    // Si no hay usuarios, crear array vacío
    if (!usuariosGuardados) {
      console.log('👥 Inicializando usuarios...')
      localStorage.setItem('usuarios', JSON.stringify([]))
    }

    // Si no hay carrito, crear array vacío
    if (!carritoGuardado) {
      console.log('🛒 Inicializando carrito...')
      localStorage.setItem('carrito', JSON.stringify([]))
    }

    // Si no hay órdenes, crear array vacío
    if (!ordenesGuardadas) {
      console.log('📋 Inicializando órdenes...')
      localStorage.setItem('ordenes', JSON.stringify([]))
    }

    console.log('✅ Datos inicializados correctamente')
    return true
  } catch (error) {
    console.error('❌ Error inicializando datos:', error)
    return false
  }
}
