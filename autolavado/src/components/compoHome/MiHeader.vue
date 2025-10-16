<template>
  <header>
    <div class="red-figure"></div>
    <nav class="menu">
      <div class="logo">
        <a href=""><img src="../../assets/imagenesHome/logo.png" alt="Logo"></a>
      </div>
      <ul>
        <router-link to="/inicio">
          <li>Inicio</li>
        </router-link>
        <li>Lavado de autos</li>
        <li>Tienda</li>
        <li>Contacto</li>
        <li>Registrarse</li>
        <router-link to="/global">
          <li>Admin</li>
        </router-link>
        <input type="text" placeholder="Buscar..." class="buscador">
      </ul>
    </nav>
  </header>
</template>
<script>


export default {
  name: 'MiHeader',
}

</script>

<style>

header {
  height: 150px;
  background-color: rgb(43, 43, 43);
  color: white;
  overflow: hidden;
}


.red-figure {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background: rgb(135, 9, 9);
  /*lo de abajo es para darle forma a la parte roja por si lo quieren cambiar jijijijija*/
  clip-path: path("M0,0 200,0 60,80 70,150 L0,200 Z");
}


.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.logo {
  margin: 0 0 0 5rem;
  z-index: 2;
  display: flex;
}

.logo img {
  height: 9rem;
  width: auto;
  border-radius: 50%;
}

.menu ul a{
  text-decoration: none;
  padding: 13px;
  transition: ease-in-out 200ms;
  border-radius: 20px;
  color: white;
}

.menu ul a:hover{
  background-color: rgb(224, 25, 25);
}

.menu ul {
  list-style: none;
  display: flex;
  margin: 1rem;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.menu li {
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
}

.buscador {
  height: 35px;
  margin: 1rem;
  padding-left: 5px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  background-color: rgb(224, 25, 25);
  color: rgb(255, 255, 255);
}

@media (max-width: 1024px) {
  .menu {
    display: grid;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .menu li {
    margin-bottom: 10px;
  }
}
</style>
