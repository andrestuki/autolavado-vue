<template>
    <div class="productos">
        <div class="producto">
            <img src="../assets/autolavado.jpeg" alt="">
            <div class="texto">Autolavado</div>
        </div>
        <div class="producto">
            <img src="../assets/mecanico.jpg" alt="">
            <div class="texto">Mecánico</div>
        </div>
        <div class="producto">
            <img src="../assets/productos.jpg" alt="">
            <div class="texto">Productos</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MisProductos"
    
}

</script>

<style>
.productos img{
    width: 563px;
    height: 650px;
    display: block;
}
.productos {
    display: flex;
    flex-direction:row ;
    align-items: center;
    
}
.texto:hover {
  background-color: #4b3e8e; /* Cambia el color de fondo */
  transform: scale(1.05);    /* Hace una animación de escala */
  transition: all 0.3s;      /* Suaviza la animación */
}

.producto {
    position: relative;
    display: inline-block;
}

.texto {
    position: absolute;
    top: 550px;
    left: 7%;
    color: white;
    background: rgba(0,0,0,0.5);
    padding: 10px 20px;
    font-size: 2rem;
    border-radius: 10px;
    pointer-events: none;
    text-align: center;
}

</style>