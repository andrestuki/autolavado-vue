<template>
<div class="container">
    <h1>Paquetes de lavado y detallado</h1>
    <p>
    Recuerda que todos nuestros Paquetes de Autolavado incluyen el aspirado
    interior de tu automóvil, si prefieres omitirlo para optimizar tiempo,
    puedes indicárselo a nuestro personal.
    </p>

    <div class="cards">
    <div class="card a">
        <h2>Paquete A</h2>
        <div class="price">$200</div>
        <ul>
        <li>Lavado exterior</li>
        <li>Shampoo espuma activa</li>
        <li>Lavado de rines y llantas</li>
        <li>Aspirado interior (opcional)</li>
        <li>Armor-All en llantas</li>
        <li>Secado a mano</li>
        </ul>
    </div>

    <div class="card b">
        <h2>Paquete B</h2>
        <div class="price">$225</div>
        <ul>
        <li>Lavado exterior</li>
        <li>Shampoo espuma activa</li>
        <li>Cera selladora</li>
        <li>Lavado de rines y llantas</li>
        <li>Aspirado interior (opcional)</li>
        <li>Armor-All en llantas</li>
        <li>Secado a mano</li>
        </ul>
    </div>

    <div class="card c">
        <h2>Paquete C</h2>
        <div class="price">$245</div>
        <ul>
        <li>Lavado exterior</li>
        <li>Shampoo espuma activa</li>
        <li>Tri-color polish conditioner</li>
        <li>Cera selladora</li>
        <li>Lavado de rines y llantas</li>
        <li>Aspirado interior (opcional)</li>
        <li>Armor-All en llantas</li>
        <li>Secado a mano</li>
        </ul>
    </div>

    <div class="card elite">
        <h2>ELITE</h2>
        <div class="price">Detallado</div>
        <ul>
        <li>Todo lo que necesitas para que tu auto luzca</li>
        <li>Limpieza y cuidado a detalle</li>
        <li>Lavado de carrocería exterior</li>
        <li>Aspirado de interiores y cajuela</li>
        <li>Limpieza y acondicionado de interiores</li>
        <li>Eliminación de contaminantes de pintura</li>
        <li>Pulido y encerado combinado</li>
        <li>Abrillantador en molduras</li>
        </ul>
    </div>
    </div>
</div>
</template>

<script>


export default {
    name: 'MisPaquetes',
}

</script>

<style scoped>

.container {
    max-width: 1100px;
    margin-top: 20px;
    margin: 50px auto;
    padding: 20px;
    text-align: center;
    color: #fff;
}

h1 {
    margin-bottom: 10px;
    color : #000;
    border-bottom: 2px solid #800;
}

p {
    margin-bottom: 40px;
    color: #000;
}


.cards {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}

.card {
    background: #fff;
    flex: 1;
    color: #333;
    border-radius: 10px;
    width: 220px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
}



.card h2 {
    margin: 0;
    font-size: 22px;
}


.price {
    font-size: 28px;
    font-weight: bold;
    margin: 10px 0;
}

/* Colores de los paquetes */
.a {
    background: #4caf50;
    color: #fff;
}
.b {
    background: #ffca28;
    color: #fff;
}


.c {
    background: #ff9800;
    color: #fff;
}
.elite {
    background: #000;
    color: #fff;
}

.card:hover{
    transform: translateY(-10px);   
}

ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;
    text-align: left;
}

ul li {
    margin: 8px 0;
    text-align: center;
}

ul li::before{
    content:"✓ ";
}

</style>