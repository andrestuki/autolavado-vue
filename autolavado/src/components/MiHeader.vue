<template>
    <div class="logo">
        <img src="@/assets/logo.jpg" alt="Logo">
    </div>
   <menu class="menu">
        <li>Inicio</li>
        <li>Lavado de autos</li>
        <li>Lavado interior</li>
        <li>Combos</li>
        <li>Tienda</li>
        <li>Nosotros</li>
        <li>Contacto</li>
   </menu>
</template>

<script>
export default {
    name: 'MiHeader'
}

</script>

<style>
.logo img {
   height: 120px;
   width: auto;
   
}
.logo{
    background-color: black;
}
.menu{
    display: flex;
    justify-content: center;
    list-style: none;
    background-color: black;
    color:white;
    gap: 50px;
    padding: 20px;
    font-weight: bold;
}
.menu li{
    cursor: pointer;
    font-size: 20px;
}
</style>