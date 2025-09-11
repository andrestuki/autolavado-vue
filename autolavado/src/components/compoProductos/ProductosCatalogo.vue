<template>
    <div class="contenedor">
        <div v-for="cata in catalogos" :key="cata.id" class="carta">
            <img :src="require(`@/assets/imagenesProductos/${cata.imagen}`)" alt="" class="imagenProducto">
            <div class="nombre">{{ cata.nombre }}</div>
            <div v-if="cata.cantidad > 0"  class="cantidad azul">{{ cata.cantidad }}</div>
            <div v-else class="cantidad negro">{{ cata.cantidad }}</div>

        </div>
    </div>
  

</template>

<script>
    export default {
        name: 'ProductosCatalogo',
        data(){
            return {
                catalogos:[{
                    id1: 1,
                    nombre:"ArmorAll",
                    imagen:"producto1.avif",
                    cantidad:100
                },
                {
                    id:2,
                    nombre:"Maddox",
                    imagen:"producto2.jpeg",
                    cantidad:0
                },
                {
                    id:3,
                    nombre:"manguera a presion",
                    imagen:"producto3.jpeg",
                    cantidad:50
                },
                {
                    id:4,
                    nombre:"Carw200",
                    imagen:"producto4.jpg",
                    cantidad:0
                },
                {
                    id:5,
                    nombre:"Kit de limpieza",
                    imagen:"producto5.jpg",
                    cantidad:20
                },
                {
                    id:6,
                    nombre:"Guantes",
                    imagen:"producto6.jpeg",
                    cantidad:0
                }
                ]
            }
      
          
        }
    }
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
   
   
    .contenedor{
        padding: 50px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 50px 45px;
        border-radius: 20px;
    }
    .carta {
   
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5% 5% 0 0;

}
    .imagenProducto{
        width: 250px;
        height: 80%;
        margin: 0;
        object-fit: cover;
        object-position: center center;
        border-radius: 5% 5% 0 0;
       
    }
    .nombre{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10%;
        font-size: 25px;
        background-color: turquoise;
       
    }
    .cantidad{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10%;
        color: white;
        font-size: 20px;
        
    }
    .azul{
        background-color: lightseagreen;
    } 
    .negro{
        background-color: rgb(20, 14, 14);
    }
    @media (max-width: 1025px) {
        .contenedor {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 600px) {
        .contenedor {
            grid-template-columns: 1fr;
        }
        .nombre {
            font-size: 20px;
        }
        .cantidad {
            font-size: 18px;
        }
    }
</style>