<template>
    <MiHeader />

    <div class="editar-productos">
        <h1 class="titulo-principal"> Gestión de hidrobombas</h1>

        <div class="contenedor-busqueda">
            <h2 class="subtitulo">Buscar pulidora por ID</h2>
            <div class="input-grupo">
                <input v-model="idBuscado" type="number" placeholder="Ingrese el ID de la pulidora"
                    class="input-texto" />
                <ButtonPrime @click="buscarpulidora" label="Buscar" icon="pi pi-search" class="btn-buscar" />
            </div>
        </div>


        <div v-if="hidrobombaseleccionado" class="formulario-editar">
            <h3 class="subtitulo">Editar Pulidora</h3>

            <div class="form-grid">
                <input v-model="hidrobombaseleccionado.nombre" class="input-texto" placeholder="Nombre" />
                <input v-model.number="hidrobombaseleccionado.precio" class="input-texto" type="number"
                    placeholder="Precio" />
                <input v-model.number="hidrobombaseleccionado.cantidad" class="input-texto" type="number"
                    placeholder="Stock" />
            </div>
            <div class="btn">
                <ButtonPrime @click="guardarCambios" label="Guardar Cambios" icon="pi pi-save" class="btn-guardar" />
                <ButtonPrime @click="eliminarProducto(index)" label="Eliminar productos" class="btn-eliminar">
                </ButtonPrime>
            </div>

        </div>

        <div v-else-if="busquedaRealizada" class="mensaje-error">
            <p>Pulidora no encontrada.</p>
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
                    <tr v-for="p in hidrobombas" :key="p.id_pulidora">
                        <td>{{ p.id_pulidora }}</td>
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
            <h2>Agregar nueva pulidora</h2>

            <form @submit.prevent="agregarProducto">
                <input v-model="nuevo.id_pulidora" type="number" placeholder="ID" required />
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
import MiHeader from '@/components/compoHome/MiHeader.vue';
import { hidrobombas } from '@/data/hidrobombas.js';



export default {
    name: 'Admin-Hidrobombas',
    components: { MiHeader, MiFooter },
    data() {
        return {

            hidrobombas,
            idBuscado: '',
            hidrobombaseleccionado: null,
            busquedaRealizada: false,
            id_pulidora: '',
            nombre: '',
            marca: '',
            precio: '',
            raiting: '',
            cantidad: '',
            imagen: '',
            imagenPreview: null,
            nuevo: {
                id_pulidora: '',
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

        const guardadas = localStorage.getItem('hidrobombas')
        this.hidrobombas = guardadas ? JSON.parse(guardadas) : hidrobombas
    },
    methods: {
        buscarpulidora() {
            this.hidrobombaseleccionado = this.hidrobombas.find(
                (p) => p.id_pulidora === Number(this.idBuscado)
            );
            this.busquedaRealizada = true;
        },
        guardarCambios() {

            localStorage.setItem('hidrobombas', JSON.stringify(this.hidrobombas));
            alert('Cambios guardados correctamente.');
        },
        eliminarProducto(index) {
            if (confirm("¿Seguro que quieres eliminar este producto?")) {
                this.hidrobombas.splice(index, 1);
                localStorage.setItem("hidrobombas", JSON.stringify(this.hidrobombas));
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
                const reader = new FileReader()
                reader.onload = () => {
                    this.nuevo.imagen = reader.result
                    this.nuevo.imagenPreview = reader.result
                }
                reader.readAsDataURL(file)
            }
        },
        agregarProducto() {
            // Crear copia del producto
            const producto = { ...this.nuevo }
            this.hidrobombas.push(producto)

            // Guardar en localStorage
            localStorage.setItem('hidrobombas', JSON.stringify(this.hidrobombas))

            alert('✅ Producto agregado correctamente')

            // Limpiar formulario
            this.nuevo = {
                id_pulidora: '',
                nombre: '',
                marca: '',
                precio: '',
                raiting: '',
                cantidad: '',
                imagen: '',
                imagenPreview: null
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
    pointer-events: none;
    color: #FFFFFF !important;
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