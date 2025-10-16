<template>
    <MiHeader></MiHeader>
    <div class="contenedor">
        <div v-for="puli in pinturas" :key="puli.id_pinturas" class="card">
            <TagPrime v-if="(puli.cantidad >= 10)" class="tag-flotante disponible" severity="success">En stock
            </TagPrime>
            <TagPrime v-else-if="(puli.cantidad == 0)" class="tag-flotante agotado" severity="secondary">Agotado
            </TagPrime>
            <TagPrime v-else-if="(puli.cantidad >= 1 && puli.cantidad < 10)" class="tag-flotante casi_agotado"
                severity="secondary">Casi Agotado</TagPrime>


            <img class="imagen-pinturas" :src="puli.imagen" alt="">
            <h4 class="nombre">{{ puli.nombre }}
                <h4 class="calificacion">
                    <span class="text-surface-900 font-medium text-sm">{{ puli.raiting }}</span>
                    <i class="pi pi-star-fill text-yellow-500"></i>
                </h4>
            </h4>
            <div class="fila-info">
                <h4 class="precio">{{ pesoCOL(puli.precio) }}</h4>

            </div>
            <div class="botones">
                <ButtonPrime :class="puli.cantidad > 0 ? 'btn-compra' : 'btn-deshabilitado'" :disabled="puli.cantidad <= 0" @Click="comprar(puli)" icon="pi pi-shopping-cart"
                    label="COMPRAR" />
                <ButtonPrime v-if="(puli.cantidad >= 0)" icon="pi pi-heart" variant="outlined"
                    class="btn-favorito edit" />
            </div>

        </div>
    </div>
    <MiFooter></MiFooter>


</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeader.vue';
import {pinturas} from '@/data/pinturas.js';
export default {

    name: "PinturasView",
    components:
    {
        MiHeader,
        MiFooter
    },
    data() {
        return {
            pinturas
        }
    },
    created() {
        // Cargar desde localStorage si existe, si no, usar los valores por defecto
        const guardadas = localStorage.getItem('pinturas');
        if (guardadas) {
            this.pinturas = JSON.parse(guardadas);
        } else {
            this.pinturas

            localStorage.setItem('pinturas', JSON.stringify(this.pinturas));
        }
    },



    methods: {
        pesoCOL: function (valor) {
            const formatoMonedaColombia = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0, // Ensures two decimal places for cents
                maximumFractionDigits: 0  // Ensures two decimal places for cents
            }).format(valor);

            return formatoMonedaColombia;
        },
        comprar(puli) {
            if (puli.cantidad > 0) {
                puli.cantidad--;
                // Guardar el array actualizado en localStorage
                localStorage.setItem('pinturas', JSON.stringify(this.pinturas));
            }
        }

    }
}
</script>

<style scoped>
.contenedor {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.card {
    background-color: white;

    border: rgb(198, 198, 204) solid 1px;
    width: 350px;
    height: 370px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.imagen-pinturas {

    width: 75%;
    height: 60%;
    margin-bottom: 15px;
}

.nombre {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 0 25px;
    margin-bottom: 10px;
    color: #333;

}

.fila-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin-bottom: 10px;
}

.precio {
    font-size: 20px;
    margin: 0;
}

.calificacion {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 15px;

}

.botones {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin-bottom: 10px;
}

.btn-compra {
    width: 270px;
    height: 30px;
    gap: 10px;
    border-radius: 5px;
    background-color: #0F172A;
    color: #FFFFFF;
}

.btn-deshabilitado {
    width: 270px;
    height: 30px;
    gap: 10px;
    border-radius: 5px;
    background-color: #5f5f5f;
    pointer-events: none;
    color: #FFFFFF;
}

.btn-compra:hover {
    background-color: #2A3445 !important;
    color: #FFFFFF !important;
    transition: background-color 0.3s ease;
}

.btn-favorito {
    position: relative;
    padding: 5px;
    left: 5px;
    background-color: white;
    color: #0F172A;
    border: rgb(170, 170, 173) solid 1px;
    border-radius: 5px;

}

.btn-favorito:hover {
    background-color: #2A3445 !important;
    color: #FFFFFF !important;
    transition: background-color 0.3s ease;
}


.tag-flotante {
    position: absolute;
    top: 10px;
    right: 230px;
    font-weight: bold;
    font-size: 14px;
    width: 100px;
    height: 27px;
    border-radius: 5px;
}

.disponible {
    background-color: #a2edbd;
    color: rgb(0, 121, 18);
}

.agotado {
    background-color: #ff6b6b;
    color: white;
}

.casi_agotado {
    background-color: #f7d794;
    color: white;
}
</style>
