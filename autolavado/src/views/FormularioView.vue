<template>
    <div class="container">
        <MiHeader></MiHeader>
        
        <div class="mainContent">
            <form @submit.prevent="submitForm">
                <h1>Reserva tu cita</h1>
                <input v-model="formData.nombre" name="nombre" type="text" placeholder="Nombre" required>
                <input v-model="formData.correo" name="correo" type="email" placeholder="Correo Electrónico" required>
                <input v-model="formData.telefono" name="telefono" type="tel" placeholder="Número de Teléfono" required>
                <input v-model="formData.placa" name="placa" type="text" placeholder="Placa del Vehículo" required>
                <select id="tipoVehiculo" name="tipoVehiculo" v-model="formData.tipoVehiculo" required>
                    <option disabled value="">Tipo de vehiculo</option>
                    <option>Auto</option>
                    <option>Camioneta</option>
                    <option>Moto</option>
                    <option>Camion</option>
                </select>
                <input v-model="formData.fecha" name="fecha" type="date" placeholder="Fecha de la Cita" required>
                <button type="submit">Reservar Cita</button>
            </form>
        </div>

        <div v-if="mostrarConfirmacion" class="modal-overlay" @click="cerrarConfirmacion">
            <div class="modal-content" @click.stop>
                <h2>Cita Reservada Exitosamente</h2>
                <div class="confirmacion-detalles">
                    <p><strong>Nombre:</strong> {{ citaConfirmada.nombre }}</p>
                    <p><strong>Correo:</strong> {{ citaConfirmada.correo }}</p>
                    <p><strong>Teléfono:</strong> {{ citaConfirmada.telefono }}</p>
                    <p><strong>Placa:</strong> {{ citaConfirmada.placa }}</p>
                    <p><strong>Tipo de Vehículo:</strong> {{ citaConfirmada.tipoVehiculo }}</p>
                    <p><strong>Fecha:</strong> {{ formatearFecha(citaConfirmada.fecha) }}</p>
                </div>
                <button @click="cerrarConfirmacion" class="btn-cerrar">Cerrar</button>
            </div>
        </div>
        
        <MiFooter></MiFooter>
    </div>
</template>

<script>
import MiHeader from '@/components/compoHome/MiHeaderNew.vue'
import MiFooter from '@/components/compoHome/MiFooter.vue'

export default {
    name: 'FormularioView',
    components: {
        MiHeader,
        MiFooter
    },
    data() {
        return {
            formData: {
                nombre: '',
                correo: '',
                telefono: '',
                placa: '',
                tipoVehiculo: '',
                fecha: ''
            },
            citaConfirmada: {
                nombre: '',
                correo: '',
                telefono: '',
                placa: '',
                tipoVehiculo: '',
                fecha: ''
            },
            mostrarConfirmacion: false
        }
    },
    methods: {
        submitForm(event) {
            event.preventDefault()
            
            if (!this.formData.nombre || !this.formData.correo || !this.formData.telefono || 
                !this.formData.placa || !this.formData.tipoVehiculo || !this.formData.fecha) {
                alert('Por favor completa todos los campos')
                return
            }

            const fechaSeleccionada = new Date(this.formData.fecha)
            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0)
            
            if (fechaSeleccionada < hoy) {
                alert('No puedes reservar una cita en el pasado')
                return
            }

            const cita = {
                idCita: Date.now(),
                nombre: this.formData.nombre.trim(),
                correo: this.formData.correo.trim(),
                telefono: this.formData.telefono.trim(),
                placa: this.formData.placa.trim().toUpperCase(),
                tipoVehiculo: this.formData.tipoVehiculo,
                fecha: this.formData.fecha,
                fechaReserva: new Date().toISOString(),
                estado: 'pendiente'
            }

            const citasGuardadas = localStorage.getItem('citas')
            let citas = citasGuardadas ? JSON.parse(citasGuardadas) : []
            citas.push(cita)
            localStorage.setItem('citas', JSON.stringify(citas))

            console.log('Cita guardada:', cita)

            this.citaConfirmada = {
                nombre: cita.nombre,
                correo: cita.correo,
                telefono: cita.telefono,
                placa: cita.placa,
                tipoVehiculo: cita.tipoVehiculo,
                fecha: cita.fecha
            }

            this.mostrarConfirmacion = true

            setTimeout(() => {
                this.formData = {
                    nombre: '',
                    correo: '',
                    telefono: '',
                    placa: '',
                    tipoVehiculo: '',
                    fecha: ''
                }
            }, 100)
        },
        cerrarConfirmacion() {
            this.mostrarConfirmacion = false
            this.citaConfirmada = {
                nombre: '',
                correo: '',
                telefono: '',
                placa: '',
                tipoVehiculo: '',
                fecha: ''
            }
        },
        formatearFecha(fecha) {
            if (!fecha) return ''
            const fechaObj = new Date(fecha + 'T00:00:00')
            return fechaObj.toLocaleDateString('es-CO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    }
}
</script>

<style scoped>
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.mainContent {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 40px 20px;
    background-color: #f9f9f9;
}
form h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.70rem;
}
label {
    margin-bottom: 6px;
    font-size: 0.9rem;
}
select {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
}
option {
    font-size: 16px;
}
form {
    border: 2px solid #ccc;
    padding: 30px;
    display: flex;
    flex-direction: column;
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
input {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
}
button {
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
    width: 50%;
    align-self: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover {
    background-color: #45a049;
}

/* Modal de confirmación */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    text-align: center;
}

.modal-content h2 {
    color: #4CAF50;
    margin-bottom: 20px;
    font-size: 1.5rem;
}

.confirmacion-detalles {
    text-align: left;
    margin: 20px 0;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 5px;
}

.confirmacion-detalles p {
    margin: 10px 0;
    font-size: 1rem;
}

.btn-cerrar {
    margin-top: 20px;
    padding: 10px 30px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-cerrar:hover {
    background-color: #45a049;
}
</style>