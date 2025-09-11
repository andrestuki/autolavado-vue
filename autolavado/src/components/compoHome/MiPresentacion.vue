<template>
    <div class="presentacion">
        <img src="../../assets/imagenesHome/carro1.avif" alt="">
        <div class="descripcion">
            <h2>Lavado de Autos</h2>
        </div>
    </div>
    <div class="mainContent">
        <h2 class="lbBienvenida">Bienvenido a nuestro autolavado, donde la excelencia en el cuidado de tu vehículo es nuestra prioridad. 
            Ofrecemos una amplia gama de servicios de lavado y detallado para mantener tu auto en perfectas condiciones.
            Nuestro equipo de profesionales utiliza productos de alta calidad y técnicas avanzadas para garantizar un acabado impecable. 
            Ya sea que necesites un lavado rápido o un servicio completo de detallado, estamos aquí para superar tus expectativas.
            Visítanos y experimenta la diferencia de un autolavado dedicado a la satisfacción del cliente. </h2>
        <div class="blackBorder"></div>
    </div>

</template>

<script>
export default {
    name: 'MiPresentacion'
}
</script>

<style>
.presentacion img{
    display: block;
    margin-left: auto;
    margin-right: 12%;
}
.descripcion {
    color: white;
    display: block;
    margin-right: 47%;
    margin-left: 0;
    margin-top: -190px;  
}
 .descripcion h2 {
    font-size: 4rem;
    margin-bottom: 3em;
    }

.presentacion {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 30px;
    height: 320px;
    background-color: #0b0da5;
}
.mainContent {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    border-top: black 10px solid;
    align-items: center;
    text-align: center;
    padding: 0;
    list-style-type: circle;
    background-color: #f0f0f0;
    gap: 80px;
}

.blackBorder {
    width: 100%;
    border: black 5px solid;
}

.lbBienvenida {
    margin-top: 65px;
    font-weight: bold;
    font-size: 30px;
}
@media (max-width:1024px){
    .presentacion img{
        display: block;
        margin-top: 40px;
        height: 250px;
        width: auto;
        margin-left: auto;
        margin-right: 20%;
    }
    .descripcion {
        color: white;
        display: block;
        margin-right: 20%;
        margin-left: 200px;
        margin-top: -10px;  
    }
    .descripcion h2 {
    font-size: 2rem;
    margin-bottom: 3em;
    }
}
@media (max-width:600px){
    .presentacion img{
        display: block;
        margin-top: 40px;
        height: 200px;
        width: auto;
        margin-left: auto;
        margin-right: 20%;
    }
    .descripcion {
        color: white;
        display: block;
        margin-right: 10%;
        margin-left: 20px;
        margin-top: 10px;  
    }
    .descripcion h2 {
    font-size: 2rem;
    margin-bottom: 3em;
    }
}


</style>