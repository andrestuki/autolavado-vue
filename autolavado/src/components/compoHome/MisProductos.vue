<template>

    <div class="textos">
        <h4 class="servicios-titulo">Servicios de Lavado</h4>
        <p class="servicios-descripcion">Vehículos limpios - Buen servicio <br>
            Precios asequibles
        </p>
    </div>
    <div class="servicios">
        <div class="servicio">
            <img src="../../assets/imagenesHome/hidroespuma.webp" alt="">
            <p class="texto-imagen">LAVADO CON<br><span>HIDROESPUMA</span> </p>
            <p class="texto-invisible">PERSONAL<br>EXPERTO<br>CAPACITADO</p>
        </div>
        <div class="servicio">
            <img src="../../assets/imagenesHome/pulidora.png" alt="">
            <p class="texto-imagen">PULIDORA SIN<br><span>ABRASIVOS</span></p>
            <p class="texto-invisible">POLICHADOL<br>RESTAURACIÓN<br>COMPLETA</p>

        </div>
        <div class="servicio">
            <img src="../../assets/imagenesHome/detallada.jpg" alt="">
            <p class="texto-imagen">LIMPIEZA<br><span>DETAILING</span> </p>
            <p class="texto-invisible">ASPIRADO<br>TAPICERÍA<br>PERFUME</p>

        </div>
        <div class="servicio">
            <img src="../../assets/imagenesHome/motor.webp" alt="">
            <p class="texto-imagen">LAVADO DE<br><span>MOTOR/CHASIS</span> </p>
            <p class="texto-invisible">LIMPIEZA<br>SIN DAÑOS<br>ELÉCTRICOS</p>

        </div>
    </div>

</template>
<script>
export default {
    name: "MisProductos"

}
</script>

<style>
* {
    text-decoration: none;
}

.textos {
    text-align: center;
    margin-top: -20px;
    margin-bottom: 20px;
    margin: 80px;
}

.servicios-titulo {
    font-size: 25px;

    color: #8f86f5;
}

.servicios-descripcion {
    font-size: 3.5rem;
    font-weight: bold;
    color: rgb(60, 60, 150);
}

.servicios {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: -150px;
    padding: 100px;
    overflow: hidden;
}

.servicio img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 440px;
    object-fit: cover;
    /* dios */
    display: block;
    filter: brightness(0.7);
    border-radius: 10px;

}

.texto-imagen {

    position: relative;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    top: -390px;
    left: 40px;
    font-size: 1.2rem;

}

.texto-imagen span {
    font-weight: bold;
    font-size: 30px;
}

.texto-invisible {
    position: relative;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: -150px;
    left: -60px;
    opacity: 0;
    font-size: 1rem;
    padding-right: 10px;
    border-right: 6px solid white;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.servicio {
    transition: ease-in-out 300ms;
}

.servicio:hover .texto-invisible {

    transform: translateY(-10px);
    opacity: 1;
    cursor: pointer;
}
</style>