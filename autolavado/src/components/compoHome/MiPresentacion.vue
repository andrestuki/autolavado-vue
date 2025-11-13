<template>
    <div class="presentacion">
        <div class="inicio-presentacion">
            <div class="inicio-titulo">
                <p>Car wash<br>El mejor <br>Servicio</p>
            </div>
            <div class="inicio-descripcion">
                <p>Limpieza profesional para tu auto con rapidez, <br> calidad y confianza.</p>
            </div>
            
            <div class="inicio-buttons">
                <router-link to="/formulario"><button class="btn-primary">Reserva tu cita</button></router-link>
                <button class="btn-secondary" @click="scrollToServices">Ver servicios</button>
            </div>
        </div>
            
            <div class="burbujas">
                <img src="../../assets/imagenesHome/burbuja1.jpg" alt="" class="burbuja1"><img />
                <img src="../../assets/imagenesHome/burbuja2.webp" alt="" class="burbuja2"><img />
            </div>
            <img src="../../assets/imagenesHome/burbujas.png" alt="" class="burbuja3"><img />
            <img src="../../assets/imagenesHome/burbujas.png" alt="" class="burbuja4"><img />
            <img src="../../assets/imagenesHome/burbujas.png" alt="" class="burbuja5"><img />
            <img src="../../assets/imagenesHome/burbujas.png" alt="" class="burbuja6"><img />
            <img src="../../assets/imagenesHome/burbujas.png" alt="" class="burbuja7"><img />
            <img src="../../assets/imagenesHome/burbujas.png" alt="" class="burbuja8"><img />
        <img src="../../assets/imagenesHome/presentacion.jpeg" alt="" class="img-presentacion">
    </div>





</template>

<script>
export default {
    name: 'MiPresentacion',
    methods: {
        scrollToServices() {
            const target = document.querySelector('.servicios');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' });
            }
        }
    }
}
</script>

<style>
.presentacion {
    background-color: rgb(51, 50, 50);
    width: 100%;
    height: 600px;
    position: relative; 
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0px 6px 8px rgb(34, 34, 34);
    z-index: 2;
}

.inicio-presentacion {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80%;
    padding: 40px 30px;
    margin-left: 1rem;
}

.img-presentacion {
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    width: 40%;
    height: 100%;
}

.inicio-titulo p {
    color: white;
    display: flex;
    font-weight: bold;
    font-size: 70px;
    font-family: 'Montserrat', sans-serif;
}

.inicio-descripcion p {
    color: white;
    display: flex;
    font-size: 17px;
    margin: 1rem 0 1rem 0;
    font-family: 'Roboto', sans-serif;
    width: 100%;
}

.inicio-buttons {
    margin-top: 20px;
    display: flex;
    gap: 20px;
}

.inicio-buttons button{
        box-shadow: 2px 2px 8px rgb(19, 19, 19);
        transition: all ease-in-out 100ms;
        padding: 10px 20px;
}

.inicio-buttons button:hover{
        scale: 1.05;
}

.inicio-buttons .btn-primary:hover{
        background-color: rgb(230, 71, 71);
}

.inicio-buttons .btn-secondary:hover{
        background-color: rgb(90, 90, 90);
}

.btn-primary {
    background-color: rgb(214, 26, 26);
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
}

.btn-secondary {
    background-color: rgb(66, 66, 66);
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
}

.burbujas {
    display: flex;
    position: absolute;
    flex-direction: column;
    margin-top: 1rem;
    top: 1%;
    right: 43%;
    gap: 30px;
}

.burbuja1 {
    width: 175px;
    height: 175px;
    margin-left: 20px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.burbuja2 {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;


}

.burbuja3 {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 80%;
    right: 70%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.burbuja4 {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 20%;
    right: 60%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.burbuja5 {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 90%;
    right: 50%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.burbuja6 {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 40%;
    right: 70%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.burbuja7 {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50%;
    right: 60%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.burbuja8 {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 70%;
    right: 50%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .presentacion {
        height: 500px;
    }

    .inicio-titulo p {
        font-size: 50px;
    }

    .inicio-descripcion p {
        font-size: 15px;
    }

    .img-presentacion {
        width: 45%;
    }

    .burbuja1 {
        width: 140px;
        height: 140px;
    }

    .burbuja2 {
        width: 100px;
        height: 100px;
    }

    .burbuja5 {
        width: 120px;
        height: 120px;
    }
}

@media (max-width: 768px) {
    .presentacion {
        height: 400px;
        justify-content: center;
    }

    .inicio-presentacion {
        padding: 20px 15px;
        margin-left: 0;
    }

    .inicio-titulo p {
        font-size: 36px;
        text-align: center;
    }

    .inicio-descripcion p {
        font-size: 13px;
        text-align: center;
    }

    .inicio-buttons {
        gap: 10px;
        margin-top: 15px;
    }

    .inicio-buttons button {
        padding: 8px 15px;
        font-size: 14px;
    }

    .img-presentacion {
        width: 50%;
    }

    .burbuja1 {
        width: 110px;
        height: 110px;
    }

    .burbuja2 {
        width: 80px;
        height: 80px;
    }

    .burbuja3 {
        width: 35px;
        height: 35px;
    }

    .burbuja4 {
        width: 45px;
        height: 45px;
    }

    .burbuja5 {
        width: 100px;
        height: 100px;
    }

    .burbuja6 {
        width: 30px;
        height: 30px;
    }

    .burbuja7 {
        width: 60px;
        height: 60px;
    }

    .burbuja8 {
        width: 45px;
        height: 45px;
    }
}

@media (max-width: 480px) {
    .presentacion {
        height: 350px;
        flex-direction: column;
        padding: 20px 10px;
    }

    .inicio-presentacion {
        padding: 15px 10px;
        height: auto;
        margin-left: 0;
        justify-content: flex-start;
    }

    .inicio-titulo p {
        font-size: 24px;
        text-align: center;
        line-height: 1.3;
    }

    .inicio-descripcion p {
        font-size: 11px;
        text-align: center;
        margin: 0.8rem 0;
    }

    .inicio-buttons {
        gap: 8px;
        margin-top: 10px;
        flex-wrap: wrap;
    }

    .inicio-buttons button {
        padding: 6px 12px;
        font-size: 12px;
        flex: 1;
        min-width: 120px;
    }

    .img-presentacion {
        width: 60%;
        height: 80%;
    }

    .burbujas {
        gap: 15px;
    }

    .burbuja1 {
        width: 80px;
        height: 80px;
        margin-left: 10px;
    }

    .burbuja2 {
        width: 60px;
        height: 60px;
    }

    .burbuja3 {
        width: 25px;
        height: 25px;
    }

    .burbuja4 {
        width: 30px;
        height: 30px;
    }

    .burbuja5 {
        width: 70px;
        height: 70px;
    }

    .burbuja6 {
        width: 20px;
        height: 20px;
    }

    .burbuja7 {
        width: 40px;
        height: 40px;
    }

    .burbuja8 {
        width: 30px;
        height: 30px;
    }
}
</style>