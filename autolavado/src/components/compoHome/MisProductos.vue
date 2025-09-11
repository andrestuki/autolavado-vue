<template>
    <div class="productos">
        <div class="producto">
            <router-link to="/autolavado">
                <img src="../../assets/imagenesHome/autolavado.jpeg" alt="">
                <div class="texto">Autolavado</div>
            </router-link>
        </div>
        <div class="producto">
            <router-link to="/mecanico">
                <img src="../../assets/imagenesHome/mecanico.jpg" alt="">
                <div class="texto">Mecánico</div>
            </router-link>
            
        </div>
        <div class="producto">
            <router-link to="/productos">
                <img src="../../assets/imagenesHome/productos.jpg" alt="">
                <div class="texto">Productos</div>
            </router-link>
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
    border-radius: 5%;
    width: 100%;
    height: 600px;
    cursor: pointer;
}
.producto {
    position: relative;
}
.productos {
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin: 50px;
    
}

.texto {
  position: absolute;
  top: 500px; 
  left: 30px;
  font-size: 2rem;
  color: white;
  background: rgba(0,0,0,0.5); 
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
}
@media (max-width:1024px){
    .productos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        margin: 20px;
    }
    .productos img{
        height: 400px;
    }
    .texto {
        top: 350px; 
        left: 20px;
        font-size: 1.8rem;
        padding: 8px 8px;
    }
}
@media (max-width:600px){
    .productos {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 10px;
    }
    .productos img{
        height: 300px;
    }
    .texto {
        top: 250px; 
        left: 20px;
        font-size: 1.5rem;
        padding: 5px 5px;
    }
}


</style>