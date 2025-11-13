<template>
    <MiHeader></MiHeader>

    <div class="editar-productos">
        <h1 class="titulo-principal">Gestión de Citas</h1>

        <div class="contenedor-busqueda">
            <h2 class="subtitulo">Buscar cita por placa o correo</h2>
            <div class="input-grupo">
                <input v-model="busqueda" type="text" placeholder="Ingrese placa o correo" class="input-texto" />
                <ButtonPrime @click="buscarCita" label="Buscar" icon="pi pi-search" class="btn-buscar" />
            </div>
        </div>

        <div v-if="citaSeleccionada" class="formulario-editar">
            <h3 class="subtitulo">Detalles de la Cita</h3>

            <div class="form-grid">
                <div class="campo-info">
                    <label>Nombre:</label>
                    <input v-model="citaSeleccionada.nombre" class="input-texto" readonly />
                </div>
                <div class="campo-info">
                    <label>Correo:</label>
                    <input v-model="citaSeleccionada.correo" class="input-texto" readonly />
                </div>
                <div class="campo-info">
                    <label>Teléfono:</label>
                    <input v-model="citaSeleccionada.telefono" class="input-texto" readonly />
                </div>
                <div class="campo-info">
                    <label>Placa:</label>
                    <input v-model="citaSeleccionada.placa" class="input-texto" readonly />
                </div>
                <div class="campo-info">
                    <label>Tipo de Vehículo:</label>
                    <input v-model="citaSeleccionada.tipoVehiculo" class="input-texto" readonly />
                </div>
                <div class="campo-info">
                    <label>Fecha de la Cita:</label>
                    <input v-model="citaSeleccionada.fecha" class="input-texto" readonly />
                </div>
                <div class="campo-info">
                    <label>Estado:</label>
                    <select v-model="citaSeleccionada.estado" class="input-texto">
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="completada">Completada</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>
            </div>
            <div class="btn">
                <ButtonPrime @click="guardarCambios" label="Guardar Cambios" icon="pi pi-save" class="btn-guardar" />
                <ButtonPrime @click="eliminarCitaSeleccionada" label="Eliminar Cita" class="btn-eliminar"></ButtonPrime>
            </div>
        </div>

        <div v-else-if="busquedaRealizada" class="mensaje-error">
            <p>Cita no encontrada.</p>
        </div>

        <div class="tabla-contenedor">
            <h3 class="subtitulo">Lista de Citas Reservadas</h3>
            <div class="filtros">
                <select v-model="filtroEstado" class="select-filtro">
                    <option value="">Todas las citas</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="confirmada">Confirmadas</option>
                    <option value="completada">Completadas</option>
                    <option value="cancelada">Canceladas</option>
                </select>
            </div>
            <table class="tabla-productos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Placa</th>
                        <th>Tipo Vehículo</th>
                        <th>Fecha Cita</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cita in citasFiltradas" :key="cita.idCita" @click="seleccionarCita(cita)"
                        class="fila-clickeable">
                        <td>{{ cita.idCita }}</td>
                        <td>{{ cita.nombre }}</td>
                        <td>{{ cita.correo }}</td>
                        <td>{{ cita.telefono }}</td>
                        <td>{{ cita.placa }}</td>
                        <td>{{ cita.tipoVehiculo }}</td>
                        <td>{{ formatearFecha(cita.fecha) }}</td>
                        <td :class="{
                            'estado-pendiente': cita.estado === 'pendiente',
                            'estado-confirmada': cita.estado === 'confirmada',
                            'estado-completada': cita.estado === 'completada',
                            'estado-cancelada': cita.estado === 'cancelada'
                        }">
                            {{ cita.estado.toUpperCase() }}
                        </td>
                    </tr>
                    <tr v-if="citasFiltradas.length === 0">
                        <td colspan="8" class="sin-citas">No hay citas registradas</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeaderNew.vue';

export default {
    name: 'CitasAdmin',
    components: { MiHeader, MiFooter },
    data() {
        return {
            citas: [],
            busqueda: '',
            citaSeleccionada: null,
            busquedaRealizada: false,
            filtroEstado: ''
        };
    },
    computed: {
        citasFiltradas() {
            if (!this.filtroEstado) {
                return this.citas;
            }
            return this.citas.filter(c => c.estado === this.filtroEstado);
        }
    },
    created() {
        this.cargarCitas();
    },
    methods: {
        cargarCitas() {
            const citasGuardadas = localStorage.getItem('citas');
            this.citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
            this.citas.sort((a, b) => new Date(b.fechaReserva) - new Date(a.fechaReserva));
        },
        buscarCita() {
            if (!this.busqueda.trim()) {
                alert('Por favor ingresa una placa o correo para buscar');
                return;
            }

            const busquedaLower = this.busqueda.toLowerCase().trim();
            this.citaSeleccionada = this.citas.find(
                (c) => c.placa.toLowerCase() === busquedaLower ||
                    c.correo.toLowerCase() === busquedaLower
            );
            this.busquedaRealizada = true;
        },
        seleccionarCita(cita) {
            this.citaSeleccionada = { ...cita };
            this.busquedaRealizada = false;
        },
        guardarCambios() {
            try {
                const indice = this.citas.findIndex(
                    (c) => c.idCita === this.citaSeleccionada.idCita
                );

                if (indice !== -1) {
                    this.citas[indice] = { ...this.citaSeleccionada };
                    localStorage.setItem('citas', JSON.stringify(this.citas));

                    alert('Cita actualizada correctamente');
                    this.cargarCitas();
                    this.citaSeleccionada = null;
                } else {
                    alert('No se encontró la cita');
                }
            } catch (error) {
                console.error('Error guardando cambios:', error);
                alert('Error al guardar: ' + error.message);
            }
        },
        eliminarCitaSeleccionada() {
            if (!this.citaSeleccionada) {
                alert('No hay cita seleccionada');
                return;
            }

            if (confirm(`¿Seguro que quieres eliminar la cita de "${this.citaSeleccionada.nombre}"?`)) {
                const indice = this.citas.findIndex(
                    (c) => c.idCita === this.citaSeleccionada.idCita
                );

                if (indice !== -1) {
                    this.citas.splice(indice, 1);
                    localStorage.setItem("citas", JSON.stringify(this.citas));

                    this.citaSeleccionada = null;
                    this.busquedaRealizada = false;
                    alert('Cita eliminada correctamente');
                    this.cargarCitas();
                }
            }
        },
        formatearFecha(fecha) {
            if (!fecha) return '';
            const fechaObj = new Date(fecha + 'T00:00:00');
            return fechaObj.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }
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

.campo-info {
    display: flex;
    flex-direction: column;
}

.campo-info label {
    margin-bottom: 5px;
    font-weight: 600;
    color: #374151;
}

.tabla-contenedor {
    margin-top: 2rem;
    width: 100%;
    overflow-x: auto;
}

.filtros {
    margin-bottom: 1rem;
}

.select-filtro {
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: white;
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

.fila-clickeable {
    cursor: pointer;
}

.fila-clickeable:hover {
    background: #e5e7eb !important;
}

.sin-citas {
    text-align: center;
    padding: 20px;
    color: #6b7280;
}

.estado-pendiente {
    color: #f59e0b;
    font-weight: bold;
}

.estado-confirmada {
    color: #10b981;
    font-weight: bold;
}

.estado-completada {
    color: #3b82f6;
    font-weight: bold;
}

.estado-cancelada {
    color: #ef4444;
    font-weight: bold;
}

.mensaje-error {
    color: #b91c1c;
    font-weight: bold;
    margin-top: 1rem;
    text-align: center;
}
</style>
