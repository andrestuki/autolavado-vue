<template>
    <div class="logo">
        <img src="@/assets/logo.jpg" alt="Logo">
    </div>
   <menu class="menu">
        <li>inicio</li>
        <li>lavado de autos</li>
        <li>lavado interior</li>
        <li>combos</li>
        <li>tienda</li>
        <li>nosotros</li>
        <li>contacto</li>
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
}
.menu li{
    cursor: pointer;
    font-size: 15px;
}
</style>