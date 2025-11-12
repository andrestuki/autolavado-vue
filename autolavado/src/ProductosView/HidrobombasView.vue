<template>
  <MiHeader />

  <div class="contenedor">
    <div
      v-for="hidr in hidrobombas"
      :key="hidr.id_hidroos"
      class="card"
    >
      <!-- Estado de stock -->
      <TagPrime
        v-if="hidr.cantidad >= 10"
        class="tag-flotante disponible"
        severity="success"
      >
        En stock
      </TagPrime>
      <TagPrime
        v-else-if="hidr.cantidad === 0"
        class="tag-flotante agotado"
        severity="secondary"
      >
        Agotado
      </TagPrime>
      <TagPrime
        v-else
        class="tag-flotante casi_agotado"
        severity="warn"
      >
        Casi Agotado
      </TagPrime>

      <!-- Imagen -->
      <img class="imagen-hidrobombas" :src="hidr.imagen" :alt="hidr.nombre" />

      <!-- Nombre y calificación -->
      <div class="info">
        <h4 class="nombre">
          {{ hidr.nombre }}
        </h4>
        <div class="calificacion">
          <span>{{ hidr.raiting }}</span>
          <i class="pi pi-star-fill text-yellow-500"></i>
        </div>
      </div>

      <!-- Precio -->
      <div class="fila-info">
        <h4 class="precio">{{ pesoCOL(hidr.precio) }}</h4>
      </div>

      <!-- Botones -->
      <div class="botones">
        <ButtonPrime
          v-if="hidr.cantidad > 0"
          class="btn-compra"
          @click="comprar(hidr)"
          icon="pi pi-shopping-cart"
          label="COMPRAR"
        />
        <ButtonPrime
          v-else
          class="btn-deshabilitado"
          :disabled="true"
          icon="pi pi-times"
          label="AGOTADO"
        />
        <ButtonPrime
          icon="pi pi-heart"
          variant="outlined"
          class="btn-favorito"
        />
      </div>
    </div>
  </div>

  <MiFooter />
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeader.vue';
import { hidrobombas } from '@/data/hidrobombas.js';

export default {
  name: "hidrobombasView",
  components: {
    MiHeader,
    MiFooter
  },
  data() {
    return {
      hidrobombas
    };
  },
  created() {
    const guardadas = localStorage.getItem('hidrobombas');
    if (guardadas) {
      this.hidrobombas = JSON.parse(guardadas);
    } else {
      localStorage.setItem('hidrobombas', JSON.stringify(this.hidrobombas));
    }
  },
  methods: {
    pesoCOL(valor) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(valor);
    },
    comprar(hidr) {
      if (hidr.cantidad > 0) {
        hidr.cantidad--;
        localStorage.setItem('hidrobombas', JSON.stringify(this.hidrobombas));

        try {
          // 🔄 Obtener carrito actual
          const cart = JSON.parse(localStorage.getItem('cart')) || [];

          // Buscar si el producto ya está
          const existing = cart.find(p => p.id === hidr.id_hidroos);

          if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
          } else {
            cart.push({
              id: hidr.id_hidroos,
              name: hidr.nombre,
              price: hidr.precio,
              quantity: 1,
              image: hidr.imagen
            });
          }

          // Guardar el carrito actualizado
          localStorage.setItem('cart', JSON.stringify(cart));

          // 🔔 Notificar al carrito (esto fuerza la actualización en vivo)
          window.dispatchEvent(new Event('storage'));

          // ✅ Alerta simple
          this.$toast?.add({
            severity: 'success',
            summary: 'Agregado al carrito',
            detail: `${hidr.nombre} añadido correctamente.`,
            life: 2000
          }) || alert(`${hidr.nombre} agregado al carrito 🛒`);

        } catch (e) {
          console.warn('Error al agregar al carrito', e);
        }
      }
    }
  }
};
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.card {
  background-color: white;
  border: 1px solid #dcdcdc;
  width: 340px;
  height: 380px;
  text-align: center;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.imagen-hidrobombas {
  width: 75%;
  height: 60%;
  margin: 10px auto;
  border-radius: 8px;
  object-fit: cover;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nombre {
  font-size: 18px;
  color: #222;
}

.calificacion {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fbbf24;
}

.fila-info {
  margin-top: 5px;
  padding: 0 20px;
  text-align: left;
}

.precio {
  font-size: 20px;
  color: #0F172A;
  font-weight: bold;
}

.botones {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.btn-compra,
.btn-deshabilitado {
  width: 230px;
  height: 36px;
  border-radius: 6px;
}

.btn-compra {
  background-color: #0F172A;
  color: #fff;
  border: none;
}

.btn-compra:hover {
  background-color: #1E293B !important;
}

.btn-deshabilitado {
  background-color: #999;
  color: #fff;
  border: none;
}

.btn-favorito {
  border: 1px solid #ccc;
  color: #0F172A;
}

.btn-favorito:hover {
  background-color: #0F172A !important;
  color: #fff !important;
}

.tag-flotante {
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  font-size: 14px;
  width: 100px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 5px;
}

.disponible {
  background-color: #a2edbd;
  color: rgb(0, 121, 18);
}

.agotado {
  background-color: #ff6b6b;
  color: white;
}

.casi_agotado {
  background-color: #f7d794;
  color: #000;
}
</style>
