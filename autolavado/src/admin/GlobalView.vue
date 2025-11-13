<template>
    <MiHeader></MiHeader>
    <div class="textos">
        <h4 class="servicios-titulo">Admin</h4>
        <p class="servicios-descripcion">Edita-agrega-Elimina <br>
            Los productos
        </p>
    </div>
    <div class="servicios">
        <div class="servicio">
            <router-link to="/admin/pulidoras">
                <img src="@/assets/imagenesHome/pulidora.webp" alt="">
                <p class="texto-imagen">PULIDORAS Y<br><span>CERAS</span> </p>
                <p class="texto-invisible">BRILLO PROFESIONAL<br>PROTECION DURADERA<br>ACADO ESPEJO</p>
            </router-link>

        </div>
        <div class="servicio">
            <router-link to="/admin/pinturas">
                <img src="@/assets/imagenesHome/pintura.webp" alt="">
            <p class="texto-imagen">PINTURAS PARA<br><span>AUTOS</span></p>
            <p class="texto-invisible">COLORES ORIGINALES<br>RESISTENCIA GARANTIZADA<br>APLICACION PRECISA</p>
            </router-link>
            
        </div>
        <div class="servicio">
            <router-link to="/admin/shampoos">
                <img src="@/assets/imagenesHome/shampu.webp" alt="">
                <p class="texto-imagen">SHAMPOO PARA<br><span>AUTOS</span> </p>
                <p class="texto-invisible">ESPUMA ACTIVA<br>LIMPIEZA PROFUNDA<br>CUIDADO DE PINTURA</p>
            </router-link>
            

        </div>
        <div class="servicio">
            <router-link to="/admin/hidrobombas">
                <img src="@/assets/imagenesHome/hidrobomba.webp" alt="">
                <p class="texto-imagen">HIDROBOMBAS Y<br><span>MAS</span> </p>
                <p class="texto-invisible">ALTA PRESION<br>AHORRO DE AGUA<br>MAXIMA EFICIENCIA</p>

            </router-link>
            

        </div>
        <div class="servicio">
            <router-link to="/admin/citas">
                <img src="@/assets/imagenesHome/hidrobomba.webp" alt="">
                <p class="texto-imagen">GESTIÓN DE<br><span>CITAS</span> </p>
                <p class="texto-invisible">VER RESERVAS<br>CONFIRMAR CITAS<br>GESTIÓN COMPLETA</p>
            </router-link>
        </div>
    </div>
    <MiFooter></MiFooter>

</template>
<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeaderNew.vue';

export default {
    name: "GlobalView",
    components:{
        MiHeader,
        MiFooter
    }

}

</script>

<style scoped>
a {
    text-decoration: none !important;
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
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: -150px;
    padding: 100px;
    overflow: hidden;
}

@media (max-width: 1200px) {
    .servicios {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .servicios {
        grid-template-columns: repeat(2, 1fr);
    }
}

.servicio img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 440px;
    object-fit: cover;
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
</style>