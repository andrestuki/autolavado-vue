<template>
    <div class="contenedor">
        <div v-for="puli in pulidoras" :key="puli.id_producto || puli.id_pulidora" class="card">
            <TagPrime v-if="(puli.cantidad >= 10)" class="tag-flotante disponible" severity="success">En stock</TagPrime>
            <TagPrime v-else-if="(puli.cantidad == 0)" class="tag-flotante agotado" severity="secondary">Agotado</TagPrime>
            <TagPrime v-else-if="(puli.cantidad >= 1 && puli.cantidad < 10)" class="tag-flotante casi_agotado" severity="secondary">Casi Agotado</TagPrime>

            <img class="imagen-pulidoras" :src="`/imagenesPulidoras/${puli.imagen}`" alt="">
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
                <ButtonPrime :class="puli.cantidad > 0 ? 'btn-compra' : 'btn-deshabilitado'"
                    :disabled="puli.cantidad <= 0"
                    @click="comprar(puli)"
                    icon="pi pi-shopping-cart"
                    label="COMPRAR" />
                <ButtonPrime v-if="(puli.cantidad >= 0)" icon="pi pi-heart" variant="outlined" class="btn-favorito edit" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "MisPulidoras",
    data() {
        return {
            pulidoras: []
        };
    },
    async created() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/productos/pulidoras');
            this.pulidoras = response.data;
        } catch (error) {
            console.error("Error al cargar pulidoras:", error);
        }
    },
    methods: {
        pesoCOL(valor) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(valor);
        },
        async comprar(puli) {
            if (puli.cantidad > 0) {
                try {
                    // Reducir la cantidad localmente (para actualizar visualmente)
                    puli.cantidad--;
                    
                    // Enviar la actualización al backend
                    const id = puli.id_producto || puli.id_pulidora;
                    await axios.put(`http://127.0.0.1:8000/api/productos/pulidoras/${id}`, {
                        cantidad: puli.cantidad
                    });
                    
                    console.log(`Cantidad actualizada para pulidora ${puli.nombre}`);
                } catch (error) {
                    console.error("Error al actualizar la cantidad:", error);
                    // Si hay error, restauramos la cantidad anterior
                    puli.cantidad++;
                    alert("No se pudo actualizar la compra. Intenta de nuevo.");
                }
            } else {
                alert("Este producto está agotado 😔");
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

.imagen-pulidoras {
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
