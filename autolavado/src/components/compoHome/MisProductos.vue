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

/* Responsive Design */
@media (max-width: 1200px) {
    .servicios {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        padding: 60px;
        margin-top: -100px;
    }

    .servicio img {
        height: 350px;
    }

    .texto-imagen {
        top: -310px;
        left: 30px;
        font-size: 1rem;
    }

    .texto-imagen span {
        font-size: 24px;
    }

    .servicios-descripcion {
        font-size: 2.5rem;
    }
}

@media (max-width: 768px) {
    .textos {
        margin: 40px 20px;
    }

    .servicios-titulo {
        font-size: 20px;
    }

    .servicios-descripcion {
        font-size: 1.8rem;
    }

    .servicios {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 40px 20px;
        margin-top: -80px;
    }

    .servicio img {
        height: 250px;
    }

    .texto-imagen {
        top: -220px;
        left: 20px;
        font-size: 0.9rem;
    }

    .texto-imagen span {
        font-size: 18px;
    }

    .texto-invisible {
        top: -110px;
        left: -45px;
        font-size: 0.8rem;
        padding-right: 8px;
        border-right: 4px solid white;
    }
}

@media (max-width: 480px) {
    .textos {
        margin: 30px 15px;
    }

    .servicios-titulo {
        font-size: 16px;
    }

    .servicios-descripcion {
        font-size: 1.3rem;
    }

    .servicios {
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 20px 15px;
        margin-top: -60px;
    }

    .servicio img {
        height: 200px;
    }

    .texto-imagen {
        top: -170px;
        left: 15px;
        font-size: 0.8rem;
    }

    .texto-imagen span {
        font-size: 14px;
    }

    .texto-invisible {
        top: -85px;
        left: -50px;
        font-size: 0.7rem;
        padding-right: 6px;
        border-right: 3px solid white;
    }
}
</style>