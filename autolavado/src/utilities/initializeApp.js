
import { cargarProductos } from '@/utilities/productosManager'

export async function inicializarDatos() {
  try {
    const productosGuardados = localStorage.getItem('productos')
    const usuariosGuardados = localStorage.getItem('usuarios')
    const carritoGuardado = localStorage.getItem('carrito')
    const ordenesGuardadas = localStorage.getItem('ordenes')

    if (!productosGuardados) {
      console.log(' Cargando productos iniciales...')
      const productos = await cargarProductos()
      localStorage.setItem('productos', JSON.stringify(productos))
      console.log(` ${productos.length} productos cargados`)
    }

    if (!usuariosGuardados) {
      console.log(' Inicializando usuarios...')
      const usuariosIniciales = [
        {
          idUsuario: 1,
          idPerfil: 1,
          usuario: "admin",
          email: "admin@example.com",
          password: "admin123",
          fullName: "Administrador",
          fechaRegistro: new Date().toISOString(),
        }
      ]
      localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales))
      console.log(' Usuario admin creado (usuario: admin, contraseña: admin123)')
    } else {
      const usuarios = JSON.parse(usuariosGuardados)
      const adminExiste = usuarios.some(u => u.usuario === 'admin' && u.idPerfil === 1)
      
      if (!adminExiste) {
        console.log(' Creando usuario admin...')
        const nuevoId = usuarios.length > 0 
          ? Math.max(...usuarios.map(u => u.idUsuario)) + 1 
          : 1
        
        usuarios.push({
          idUsuario: nuevoId,
          idPerfil: 1,
          usuario: "admin",
          email: "admin@example.com",
          password: "admin123",
          fullName: "Administrador",
          fechaRegistro: new Date().toISOString(),
        })
        
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        console.log(' Usuario admin creado (usuario: admin, contraseña: admin123)')
      }
    }

    if (!carritoGuardado) {
      console.log(' Inicializando carrito...')
      localStorage.setItem('carrito', JSON.stringify([]))
    }

    if (!ordenesGuardadas) {
      console.log(' Inicializando órdenes...')
      localStorage.setItem('ordenes', JSON.stringify([]))
    }

    console.log(' Datos inicializados correctamente')
    return true
  } catch (error) {
    console.error(' Error inicializando datos:', error)
    return false
  }
}
