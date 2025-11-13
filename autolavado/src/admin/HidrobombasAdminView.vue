<template>
    <MiHeader />

    <div class="editar-productos">
        <h1 class="titulo-principal"> Gestión de hidrobombas</h1>

        <div class="contenedor-busqueda">
            <h2 class="subtitulo">Buscar hidrobomba por ID</h2>
            <div class="input-grupo">
                <input v-model="idBuscado" type="number" placeholder="Ingrese el ID de la hidrobomba"
                    class="input-texto" />
                <ButtonPrime @click="buscarHidrobomba" label="Buscar" icon="pi pi-search" class="btn-buscar" />
            </div>
        </div>


        <div v-if="hidrobombaseleccionado" class="formulario-editar">
            <h3 class="subtitulo">Editar Hidrobomba</h3>

            <div class="form-grid">
                <input v-model="hidrobombaseleccionado.nombre" class="input-texto" placeholder="Nombre" />
                <input v-model.number="hidrobombaseleccionado.precio" class="input-texto" type="number"
                    placeholder="Precio" />
                <input v-model.number="hidrobombaseleccionado.cantidad" class="input-texto" type="number"
                    placeholder="Stock" />
            </div>
            <div class="btn">
                <ButtonPrime @click="guardarCambios" label="Guardar Cambios" icon="pi pi-save" class="btn-guardar" />
                <ButtonPrime @click="eliminarProductoSeleccionado" label="Eliminar Producto" class="btn-eliminar">
                </ButtonPrime>
            </div>

        </div>

        <div v-else-if="busquedaRealizada" class="mensaje-error">
            <p>Hidrobomba no encontrada.</p>
        </div>

        <div class="tabla-contenedor">
            <h3 class="subtitulo"> Lista de hidrobombas</h3>
            <table class="tabla-productos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in hidrobombas" :key="p.id_hidrobomba">
                        <td>{{ p.id_hidrobomba }}</td>
                        <td>{{ p.nombre }}</td>
                        <td>{{ pesoCOL(p.precio) }}</td>
                        <td :class="{
                            'stock-bajo': p.cantidad <= 3,
                            'stock-medio': p.cantidad > 3 && p.cantidad < 10,
                            'stock-alto': p.cantidad >= 10
                        }">
                            {{ p.cantidad }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div class="admin-agregar">
            <h2>Agregar nueva hidrobomba</h2>

            <form @submit.prevent="agregarProducto">
                <input v-model="nuevo.id_hidrobomba" type="number" placeholder="ID" required />
                <input v-model="nuevo.nombre" placeholder="Nombre" required />
                <input v-model="nuevo.marca" placeholder="Marca" required />
                <input v-model="nuevo.precio" type="number" placeholder="Precio (COP)" required />
                <input v-model="nuevo.raiting" type="number" step="0.1" min="0" max="5" placeholder="Calificación" />
                <input v-model="nuevo.cantidad" type="number" min="0" placeholder="Stock" required />
                <input type="file" accept="image/*" @change="cargarImagen" />

                <ButtonPrime class="btn-agregar" @click="agregarProducto()" label="AGREGAR" icon="pi pi-check"
                    iconPos="right" />

            </form>

            <div v-if="nuevo.imagenPreview" class="preview">
                <h4>Vista previa:</h4>
                <img :src="nuevo.imagenPreview" alt="Vista previa" />
            </div>
        </div>
    </div>

    <MiFooter />
</template>



<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeaderNew.vue';




export default {
    name: 'AdminHidrobombas',
    components: { MiHeader, MiFooter },
    data() {
        return {

            hidrobombas: [],
            idBuscado: '',
            hidrobombaseleccionado: null,
            busquedaRealizada: false,
            id_hidrobomba: '',
            nombre: '',
            marca: '',
            precio: '',
            raiting: '',
            cantidad: '',
            imagen: '',
            imagenPreview: null,
            nuevo: {
                id_hidrobomba: '',
                nombre: '',
                marca: '',
                precio: '',
                raiting: '',
                cantidad: '',
                imagen: '',
                imagenPreview: null
            }
        };
    },
    created() {
        // Cargar desde el sistema unificado de productos
        const productosJSON = localStorage.getItem('productos')
        const todosLosProductos = productosJSON ? JSON.parse(productosJSON) : []
        
        // Filtrar solo hidrobombas (categoría 1)
        this.hidrobombas = todosLosProductos.filter(p => p.id_categoria === 1)
        
        // Si no hay productos en el sistema unificado, intentar cargar desde la lista específica
        if (this.hidrobombas.length === 0) {
            const guardadas = localStorage.getItem('hidrobombas')
            this.hidrobombas = guardadas ? JSON.parse(guardadas) : []
        }
    },
    methods: {
        buscarHidrobomba() {
            this.hidrobombaseleccionado = this.hidrobombas.find(
                (p) => p.id_hidrobomba === Number(this.idBuscado)
            );
            this.busquedaRealizada = true;
        },
        guardarCambios() {
            try {
                // Encontrar el índice del producto seleccionado
                const indice = this.hidrobombas.findIndex(
                    (p) => p.id_hidrobomba === this.hidrobombaseleccionado.id_hidrobomba
                );

                if (indice !== -1) {
                    // Actualizar el producto en el array local
                    this.hidrobombas[indice] = { ...this.hidrobombaseleccionado };
                    
                    // Actualizar en el sistema unificado de productos
                    const productosJSON = localStorage.getItem('productos')
                    let todosLosProductos = productosJSON ? JSON.parse(productosJSON) : []
                    
                    const indiceGlobal = todosLosProductos.findIndex(p => 
                        p.id_categoria === 1 && p.id_hidrobomba === this.hidrobombaseleccionado.id_hidrobomba
                    )
                    
                    if (indiceGlobal !== -1) {
                        todosLosProductos[indiceGlobal] = { ...this.hidrobombaseleccionado }
                        localStorage.setItem('productos', JSON.stringify(todosLosProductos))
                    }
                    
                    // También guardar en la lista específica
                    localStorage.setItem('hidrobombas', JSON.stringify(this.hidrobombas));
                    
                    // Emitir evento para actualizar vistas
                    window.dispatchEvent(new CustomEvent('productosActualizados'))
                    
                    alert(' Hidrobomba actualizada correctamente');
                } else {
                    alert(' No se encontró la hidrobomba');
                }
            } catch (error) {
                console.error('Error guardando cambios:', error)
                alert(' Error al guardar: ' + error.message)
            }
        },
        eliminarProducto(index) {
            if (confirm("¿Seguro que quieres eliminar este producto?")) {
                const productoEliminado = this.hidrobombas[index]
                
                // Eliminar del array local
                this.hidrobombas.splice(index, 1);
                
                // Eliminar del sistema unificado de productos
                const productosJSON = localStorage.getItem('productos')
                let todosLosProductos = productosJSON ? JSON.parse(productosJSON) : []
                
                todosLosProductos = todosLosProductos.filter(p => 
                    !(p.id_categoria === 1 && p.id_hidrobomba === productoEliminado.id_hidrobomba)
                )
                
                localStorage.setItem("productos", JSON.stringify(todosLosProductos));
                localStorage.setItem("hidrobombas", JSON.stringify(this.hidrobombas));
                
                // Emitir evento para actualizar vistas
                window.dispatchEvent(new CustomEvent('productosActualizados'))
                
                alert(' Producto eliminado correctamente');
            }
        },
        eliminarProductoSeleccionado() {
            if (!this.hidrobombaseleccionado) {
                alert(' No hay producto seleccionado');
                return;
            }
            
            if (confirm(`¿Seguro que quieres eliminar "${this.hidrobombaseleccionado.nombre}"?`)) {
                const indice = this.hidrobombas.findIndex(
                    (p) => p.id_hidrobomba === this.hidrobombaseleccionado.id_hidrobomba
                );
                
                if (indice !== -1) {
                    // Eliminar del array local
                    this.hidrobombas.splice(indice, 1);
                    
                    // Eliminar del sistema unificado de productos
                    const productosJSON = localStorage.getItem('productos')
                    let todosLosProductos = productosJSON ? JSON.parse(productosJSON) : []
                    
                    todosLosProductos = todosLosProductos.filter(p => 
                        !(p.id_categoria === 1 && p.id_hidrobomba === this.hidrobombaseleccionado.id_hidrobomba)
                    )
                    
                    localStorage.setItem("productos", JSON.stringify(todosLosProductos));
                    localStorage.setItem("hidrobombas", JSON.stringify(this.hidrobombas));
                    
                    // Emitir evento para actualizar vistas
                    window.dispatchEvent(new CustomEvent('productosActualizados'))
                    
                    this.hidrobombaseleccionado = null;
                    this.busquedaRealizada = false;
                    alert(' Producto eliminado correctamente');
                }
            }
        },
        pesoCOL(valor) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
            }).format(valor);
        },
        cargarImagen(e) {
            const file = e.target.files[0]
            if (file) {
                // Solo guardar el nombre del archivo, no el contenido base64
                const nombreArchivo = file.name
                // Para preview, usar FileReader pero no guardar en el producto
                const reader = new FileReader()
                reader.onload = () => {
                    this.nuevo.imagenPreview = reader.result
                    // Guardar solo la ruta/nombre del archivo
                    this.nuevo.imagen = `/imagenesHidrobombas/${nombreArchivo}`
                }
                reader.readAsDataURL(file)
            }
        },
        async agregarProducto() {
            try {
                // Validar que todos los campos requeridos estén llenos
                if (!this.nuevo.id_hidrobomba || !this.nuevo.nombre || !this.nuevo.marca || 
                    !this.nuevo.precio || !this.nuevo.cantidad) {
                    alert(' Por favor completa todos los campos requeridos')
                    return
                }

                // Crear producto normalizado
                const producto = {
                    id_hidrobomba: Number(this.nuevo.id_hidrobomba),
                    id_categoria: 1, // Hidrobombas
                    nombre: this.nuevo.nombre.trim(),
                    marca: this.nuevo.marca.trim(),
                    precio: Number(this.nuevo.precio),
                    raiting: Number(this.nuevo.raiting) || 4.5,
                    cantidad: Number(this.nuevo.cantidad),
                    imagen: this.nuevo.imagen || '/imagenesHidrobombas/default.jpg',
                    // Normalizar ID de producto
                    id_producto: `1-${this.nuevo.id_hidrobomba}`
                }

                // Agregar a la lista local
                this.hidrobombas.push(producto)

                // Cargar productos existentes desde localStorage
                const productosJSON = localStorage.getItem('productos')
                let todosLosProductos = productosJSON ? JSON.parse(productosJSON) : []

                // Verificar si el producto ya existe
                const existe = todosLosProductos.find(p => 
                    p.id_categoria === 1 && p.id_hidrobomba === producto.id_hidrobomba
                )

                if (existe) {
                    // Actualizar producto existente
                    const indice = todosLosProductos.findIndex(p => 
                        p.id_categoria === 1 && p.id_hidrobomba === producto.id_hidrobomba
                    )
                    todosLosProductos[indice] = { ...todosLosProductos[indice], ...producto }
                } else {
                    // Agregar nuevo producto
                    todosLosProductos.push(producto)
                }

                // Guardar en el sistema unificado de productos
                try {
                    localStorage.setItem('productos', JSON.stringify(todosLosProductos))
                } catch (error) {
                    if (error.name === 'QuotaExceededError') {
                        alert(' Error: No hay suficiente espacio en el almacenamiento. Por favor, elimina algunos productos o limpia el localStorage.')
                        // Revertir cambios locales
                        this.hidrobombas.pop()
                        return
                    }
                    throw error
                }

                // También guardar en la lista específica de hidrobombas (para compatibilidad)
                try {
                    localStorage.setItem('hidrobombas', JSON.stringify(this.hidrobombas))
                } catch (error) {
                    console.warn('No se pudo guardar en hidrobombas específico:', error)
                }

                // Emitir evento para actualizar vistas
                window.dispatchEvent(new CustomEvent('productosActualizados'))

                alert(' Producto agregado correctamente')

                // Limpiar formulario
                this.nuevo = {
                    id_hidrobomba: '',
                    nombre: '',
                    marca: '',
                    precio: '',
                    raiting: '',
                    cantidad: '',
                    imagen: '',
                    imagenPreview: null
                }
            } catch (error) {
                console.error('Error agregando producto:', error)
                alert(' Error al agregar producto: ' + error.message)
            }
        }
    },



};
</script>

<style scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    gap: 20px;

}

.btn-buscar {
    width: 100px;
    height: 30px;
    gap: 10px;
    border-radius: 5px;
    background-color: #14a542 !important;
    color: #FFFFFF !important;
}

.btn-guardar {
    width: 270px;
    height: 30px;
    gap: 10px;
    border-radius: 5px;
    background-color: #0F172A !important;
    color: #FFFFFF !important;
}

.btn-eliminar {
    width: 270px;
    height: 30px;
    gap: 10px;
    border-radius: 5px;
    background-color: #b62323 !important;
    color: #FFFFFF !important;
    cursor: pointer;
}



.editar-productos {
    width: 100%;
    padding: 2rem 3rem;
    background-color: #f9fafb;
    border-radius: 0;
    box-shadow: none;
}

.titulo-principal {
    text-align: center;
    color: #1f2937;
    margin-bottom: 2rem;
    font-size: 2rem;
}

.subtitulo {
    color: #374151;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

.input-grupo {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
}

.input-texto {
    flex: 1;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
}

.formulario-editar {
    margin-top: 1.5rem;
    background: #ffffff;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    width: 100%;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.tabla-contenedor {
    margin-top: 2rem;
    width: 100%;
    overflow-x: auto;
}

.tabla-productos {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 0;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.tabla-productos th {
    background: #505154;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: 600;
}

.tabla-productos td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
}

.tabla-productos tr:hover {
    background: #f3f4f6;
}

.stock-bajo {
    color: #b91c1c;
    font-weight: bold;
}

.stock-medio {
    color: #ca8a04;
    font-weight: bold;
}

.stock-alto {
    color: #15803d;
    font-weight: bold;
}

.mensaje-error {
    color: #b91c1c;
    font-weight: bold;
    margin-top: 1rem;
    text-align: center;
}

.admin-agregar {
    max-width: 600px;
    margin: 40px auto;
    background: linear-gradient(145deg, #ffffff, #f3f6ff);
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 2.5rem;
    text-align: center;
    transition: all 0.3s ease-in-out;
}


.admin-agregar h2 {
    color: #2c3e50;
    font-size: 1.8rem;
    margin-bottom: 1.8rem;
    letter-spacing: 0.5px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input[type="number"],
input[type="text"],
input[type="file"],
input {
    padding: 12px 15px;
    border: 2px solid #e0e4f4;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.25s ease;
    background: #f9faff;
    color: #333;
}

input:focus {
    border-color: #5b8df7;
    background: #fff;
    outline: none;
    box-shadow: 0 0 8px rgba(91, 141, 247, 0.3);
}

input[type="file"] {
    border: none;
    background: transparent;
    font-size: 0.9rem;
    cursor: pointer;
    color: #5b8df7;
}

.btn-agregar {
    margin-top: 1rem;
    align-self: center;
    width: 100%;
    font-weight: bold;
    letter-spacing: 1px;
    background: linear-gradient(90deg, #24262b, #23272d) !important;
    color: white !important;
    border-radius: 12px;
    padding: 12px;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 5px 15px rgba(91, 141, 247, 0.3);
}



.preview {
    margin-top: 2rem;
    text-align: center;
}

.preview h4 {
    color: #4a7be7;
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.preview img {
    max-width: 200px;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.4s ease;
}
</style>