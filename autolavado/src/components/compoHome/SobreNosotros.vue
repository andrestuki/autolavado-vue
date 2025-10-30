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
        <button @click="openMapModal">¿Cómo llegar?</button>
      </div>

      <!-- Modal overlay para el mapa -->
      <div v-if="showMapModal" class="map-overlay" @click.self="closeMapModal" role="dialog" aria-modal="true"
        aria-label="Mapa de ubicación">
        <div class="map-modal">
          <button class="map-close" @click="closeMapModal" aria-label="Cerrar mapa">✕</button>
          <!-- Iframe embebido de Google Maps: cambia la query en src para apuntar a la dirección deseada -->
          <div class="map-container">
            <iframe :src="mapSrc" frameborder="0" allowfullscreen aria-hidden="false" tabindex="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SobreNosotros',
  data() {
    return {
      showMapModal: false,
      // URL base para el iframe; por defecto busca "autolavado" en Google Maps.
      // Puedes cambiar la query a una dirección específica, coordenadas o place id.
      mapQuery: 'autolavado',
    }
  },
  computed: {
    mapSrc() {
      // Usa output=embed para mostrar el mapa embebido
      return `https://www.google.com/maps?q=${encodeURIComponent(this.mapQuery)}&output=embed`;
    }
  },
  methods: {
    openMapModal() {
      this.showMapModal = true;
      // bloquear scroll de fondo opcional
      document.body.style.overflow = 'hidden';
    },
    closeMapModal() {
      this.showMapModal = false;
      document.body.style.overflow = '';
    },
    handleKeydown(e) {
      if (e.key === 'Escape' && this.showMapModal) {
        this.closeMapModal();
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = '';
  }
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

/* Estilos del modal de mapa */
.map-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 9999;
}

.map-modal {
  position: relative;
  width: 90%;
  max-width: 900px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  padding: 1rem;
}

.map-close {
  position: absolute;
  right: 8px;
  top: 8px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.map-container iframe {
  width: 100%;
  height: 450px;
  border-radius: 6px;
  border: none;
}

@media (max-width: 600px) {
  .map-container iframe {
    height: 60vh;
  }

  .map-modal {
    padding: 0.5rem;
  }
}
</style>