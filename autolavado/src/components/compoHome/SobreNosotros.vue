<template>
  <div class="sobre-nosotros">

    <div class="imagen">
      <img src="../../assets/imagenesHome/sobrenosotros.png" alt="">
      <img src="../../assets/imagenesHome/nosotros-sede.png" alt="" class="imagen2">
    </div>

    <div class="texto">
      <h4>SOBRE NOSOTROS</h4>
      <h1>¡Más que limpio y más que solo brillo!</h1>
      <p>
        Ofrecemos una gama de servicios detallados para que su vehículo se vea y se sienta genial desde adentro hacia
        afuera.
        Con más de 5 años de experiencia en la industria, puede contar con nosotros para limpiar a fondo su vehículo sin
        el uso de productos químicos agresivos.
      </p>
      <ul>
        <li>✔️ Mantenga su auto más limpio por más tiempo.</li>
        <li>✔️ Secado con toalla con gamuza y microfibra.</li>
        <li>✔️ Polvo de frenos y contaminantes limpiados de las llantas.</li>
        <li>✔️ Completamente aspirado, incluidas las zonas de difícil acceso.</li>
      </ul>
      <div class="botones">
        <button>¿Cómo llegar?</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SobreNosotros'
}
</script>

<style scoped>
.sobre-nosotros {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 15rem 0 5rem 0;
  box-shadow: inset 0px 10px 14px -5px rgb(92, 92, 92);
}

.imagen img {
  border-radius: 3%;
  box-shadow: 2px 2px 8px rgb(65, 65, 65);
}

.imagen2 {
  position: relative;
  height: 220px;
  width: 280px;
  top: -220px;
  left: 220px;
}

.texto {
  position: relative;
  top: 70%;
  padding: 1rem;
  width: 600px;
}

.texto h4 {
  color: #e41212;
  font-size: 22px;
  margin: 1rem;
  text-transform: uppercase;
  font-weight: bold;
}

.texto h1 {
  font-size: 3rem;
  font-weight: bold;
  color: #334;
  margin: 2rem 0 2rem 0;
}

.texto ul {
  margin: 1rem 0;
  padding-left: 1rem;
  list-style: none;
}

.texto p {
  margin: 2rem 0 2rem 0;
  font-size: 28px;
}

.texto ul li {
  margin-bottom: 0.5rem;
  font-family: 24px;
}

.botones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1rem 0;
}

.botones button {
  padding: 0.6rem 1.2rem;
  border: 2px solid #334;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

.botones button:hover {
  background: rgb(48, 48, 48);
  color: white;
}

.imagen2 {
  position: relative;
  top: -90px;
  left: -180px;
}
</style>