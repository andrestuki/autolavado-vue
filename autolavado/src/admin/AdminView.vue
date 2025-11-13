<template>
    <MiHeader />
    <h1> Editar productos</h1>
    <div>
        <h2>Buscar pulidora por ID</h2>
        <input v-model="idBuscado" placeholder="Ingrese ID del pulidora" />
        <buttonPrime @click="buscarpulidora">Buscar</buttonPrime>

        <div v-if="pulidoraSeleccionado">
            <h3>Editar pulidora</h3>
            <input v-model="pulidoraSeleccionado.nombre" placeholder="Nombre" />
            <input v-model="pulidoraSeleccionado.precio" type="number" placeholder="Precio" />
            <input v-model="pulidoraSeleccionado.cantidad" type="number" placeholder="Stock">
            <buttonPrime @click="guardarCambios">Guardar Cambios</buttonPrime>
        </div>
        <div v-else-if="busquedaRealizada">
            <p>pulidora no encontrado.</p>
        </div>
    </div>
    <div>
        <h3>Lista de pulidoras</h3>
        <ul>
            <li v-for="p in pulidoras" :key="p.id">
                ID: {{ p.id_pulidora }} — {{ p.nombre }} — {{ pesoCOL(p.precio) }}
            </li>
        </ul>
    </div>
    <MiFooter />
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeaderNew.vue';



export default {
    name: 'AdminView',
    components: {
        MiHeader,
        MiFooter
    },
    created() {
        const guardadas = localStorage.getItem('pulidoras');
        this.pulidoras = guardadas ? JSON.parse(guardadas) : [];
    },

    data() {
        return {
            pulidoras: [],
            idBuscado: '',
            pulidoraSeleccionado: null,
            busquedaRealizada: false
        }
    },
    methods: {
        buscarpulidora() {
            this.pulidoraSeleccionado = this.pulidoras.find(
                p => p.id_pulidora === Number(this.idBuscado)
            );
            this.busquedaRealizada = true;
        },
        pesoCOL: function (valor) {
            const formatoMonedaColombia = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(valor);

            return formatoMonedaColombia;
        },
        guardarCambios() {

            const index = this.pulidoras.findIndex(
                p => p.id_pulidora === this.pulidoraSeleccionado.id_pulidora
            );


            if (index !== -1) {
                this.pulidoras[index] = { ...this.pulidoraSeleccionado };


                localStorage.setItem('pulidoras', JSON.stringify(this.pulidoras));

                alert('Pulidora actualizada correctamente');
            } else {
                alert('No se encontró la pulidora');
            }
        }
    }
}  
</script>

<style scoped>
/* ... */
</style>