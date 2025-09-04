<template>
    <div class="presentacion">
        <img src="../assets/carro1.avif" alt="">
        <div class="descripcion">
            <h2>Lavado de Autos</h2>
        </div>
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
    margin-right: 10%;
}
.descripcion {
    color: white;
    display: block;
    margin-right: 47%;
    margin-left: 0;
    margin-top: -190px;

  
}
.descripcion h2 {
    font-size: 5rem;
    margin-bottom: 0.4em;
}
.presentacion {
    width: 100%;
    height: 400px;
    background-color: #0b0da5;
}


</style>