<template>
    <MiHeader />
    <div>
        <h2>Buscar pulidora por ID</h2>
        <input v-model="idBuscado" placeholder="Ingrese ID del pulidora" />
        <button @click="buscarpulidora">Buscar</button>

        <div v-if="pulidoraSeleccionado">
            <h3>Editar pulidora</h3>
            <input v-model="pulidoraSeleccionado.nombre" placeholder="Nombre" />
            <input v-model="pulidoraSeleccionado.precio" type="number" placeholder="Precio" />
            <button @click="guardarCambios">Guardar Cambios</button>
        </div>
        <div v-else-if="busquedaRealizada">
            <p>pulidora no encontrado.</p>
        </div>
    </div>
    <div>
        <h3>Lista de pulidoras</h3>
        <ul>
            <li v-for="p in pulidoras" :key="p.id">
                ID: {{ p.id }} — {{ p.nombre }} — {{ p.precio }}
            </li>
        </ul>
    </div>
    <MiFooter />
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeader.vue';
import {pulidoras} from '@/data/pulidoras.js';

// Ejemplo de lista de pulidoras

export default {
    name: 'AdminView',
    components: {
        MiHeader,
        MiFooter
    },
    data() {
        return {
            pulidoras,
            idBuscado: '',
            pulidoraSeleccionado: null,
            busquedaRealizada: false
        }
    },
    methods: {
        buscarpulidora() {
            this.pulidoraSeleccionado = this.pulidoras.find(
                p => p.id === Number(this.idBuscado)
            );
            this.busquedaRealizada = true;
        },
        guardarCambios() {
            alert('pulidora actualizado: ' + JSON.stringify(this.pulidoraSeleccionado));
            // Aquí puedes guardar los cambios en tu backend o store
        }
    }
}  
</script>

<style scoped>
/* ... */
</style>