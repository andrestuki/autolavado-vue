<template>
    <div class="logo">
        <img src="../../assets/imagenesHome/logo.jpg" alt="Logo">
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
@media (max-width: 1024px)
{
    .menu {
        display:grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }
    .menu li {
        margin-bottom: 10px;
        font-size: 15px;
    }

}
@media (max-width: 600px) {
    .menu {
        display:grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .menu li {
        margin-bottom: 10px;
    }
}

</style>