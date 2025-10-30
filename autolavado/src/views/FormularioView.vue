<template>
    <div class="mainContent">
        <form @submit.prevent="submitForm">
            <h1>Reserva tu cita</h1>
            <input name="nombre" type="text" placeholder="Nombre">
            <input name="correo" type="email" placeholder="Correo Electrónico">
            <input name="telefono" type="tel" placeholder="Número de Teléfono">
            <input name="placa" type="text" placeholder="Placa del Vehículo">
            <select id="tipoVehiculo" name="tipoVehiculo" v-model="vehicleType">
                <option disabled value="">Tipo de vehiculo</option>
                <option>Auto</option>
                <option>Camioneta</option>
                <option>Moto</option>
                <option>Camion</option>
            </select>
            <input name="fecha" type="date" placeholder="Fecha de la Cita">
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            // binding para el combobox
            vehicleType: ''
        }
    },
    methods: {
        submitForm(event) {
            // Obtener los valores del formulario y mostrarlos por consola
            const formData = new FormData(event.target);
            const values = Object.fromEntries(formData.entries());
            console.log('Formulario enviado:', values);
            // Aquí puedes reemplazar con la lógica para enviar a una API, validar, etc.
            alert(`Tipo de vehículo seleccionado: ${this.vehicleType || 'No seleccionado'}`);
        }
    }
}
</script>

<style scoped>
.mainContent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
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
</style>