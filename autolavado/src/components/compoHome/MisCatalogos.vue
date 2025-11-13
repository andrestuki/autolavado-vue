<template>

    <div id="tienda-productos" class="textos">
        <h4 class="servicios-titulo">Productos de Lavado</h4>
        <p class="servicios-descripcion">Vehículos limpios - Buenos Productos <br>
            Precios asequibles
        </p>
    </div>
    <div class="servicios">
        <div class="servicio">
            <router-link to="/pulidoras">
                <img src="../../assets/imagenesHome/pulidora.webp" alt="">
                <p class="texto-imagen">PULIDORAS Y<br><span>CERAS</span> </p>
                <p class="texto-invisible">BRILLO PROFESIONAL<br>PROTECION DURADERA<br>ACADO ESPEJO</p>
            </router-link>

        </div>
        <div class="servicio">
            <router-link to="/pinturas">
                <img src="../../assets/imagenesHome/pintura.webp" alt="">
            <p class="texto-imagen">PINTURAS PARA<br><span>AUTOS</span></p>
            <p class="texto-invisible">COLORES ORIGINALES<br>RESISTENCIA GARANTIZADA<br>APLICACION PRECISA</p>
            </router-link>
            
        </div>
        <div class="servicio">
            <router-link to="/shampoos">
                <img src="../../assets/imagenesHome/shampu.webp" alt="">
                <p class="texto-imagen">SHAMPOO PARA<br><span>AUTOS</span> </p>
                <p class="texto-invisible">ESPUMA ACTIVA<br>LIMPIEZA PROFUNDA<br>CUIDADO DE PINTURA</p>
            </router-link>
            
        </div>
        <div class="servicio">
            <router-link to="/hidrobombas">
            <img src="../../assets/imagenesHome/hidrobomba.webp" alt="">
            <p class="texto-imagen">HIDROBOMBAS Y<br><span>MAS</span> </p>
            <p class="texto-invisible">ALTA PRESION<br>AHORRO DE AGUA<br>MAXIMA EFICIENCIA</p>
            </router-link>
        </div>
    </div>

</template>
<script>
export default {
    name: "MisCatalogos"

}

</script>

<style scoped>
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
    left: -20px;
    opacity: 0;
    font-size: 1rem;
    padding-right: 10px;
    border-right: 6px solid white;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.servicio:hover {
    transform: scale(1.05);
    cursor: pointer;
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
        left: -15px;
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
        left: -10px;
        font-size: 0.7rem;
        padding-right: 6px;
        border-right: 3px solid white;
    }
}
</style>