<template>
  <MiHeader></MiHeader>
  <div class="contenedor">
    <div v-for="hidr in hidrobombas" :key="hidr.id_producto" class="card">
      <TagPrime v-if="(hidr.cantidad >= 10)" class="tag-flotante disponible" severity="success">En stock</TagPrime>
      <TagPrime v-else-if="(hidr.cantidad == 0)" class="tag-flotante agotado" severity="secondary">Agotado</TagPrime>
      <TagPrime v-else-if="(hidr.cantidad >= 1 && hidr.cantidad < 10)" class="tag-flotante casi_agotado" severity="secondary">Casi Agotado</TagPrime>

      <img class="imagen-hidrobombas" :src="`/imagenesHidrobombas/${hidr.imagen}`" alt="">
      <h4 class="nombre">{{ hidr.nombre }}
        <h4 class="calificacion">
          <span class="text-surface-900 font-medium text-sm">{{ hidr.raiting }}</span>
          <i class="pi pi-star-fill text-yellow-500"></i>
        </h4>
      </h4>

      <div class="fila-info">
        <h4 class="precio">{{ pesoCOL(hidr.precio) }}</h4>
      </div>

      <div class="botones">
        <ButtonPrime :class="hidr.cantidad > 0 ? 'btn-compra' : 'btn-deshabilitado'"
                     :disabled="hidr.cantidad <= 0"
                     @click="comprar(hidr)"
                     icon="pi pi-shopping-cart"
                     label="COMPRAR" />
        <ButtonPrime v-if="(hidr.cantidad >= 0)" icon="pi pi-heart" variant="outlined" class="btn-favorito edit" />
      </div>
    </div>
  </div>
  <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeader.vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth'

export default {
  name: "hidrobombasView",
  components: { MiHeader, MiFooter },
  data() {
    return {
      hidrobombas: []
    }
  },
  async created() {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/productos/hidrobombas');
      console.log('Hidrobombas cargadas:', res.data);
      this.hidrobombas = res.data;
    } catch (err) {
      console.error('Error cargando hidrobombas:', err);
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

    async comprar(hidr) {
      const auth = useAuthStore();
      if (!auth.user) {
        alert('Debes iniciar sesión para agregar al carrito');
        this.$router.push('/login');
        return;
      }

      if (hidr.cantidad <= 0) {
        alert("Este producto está agotado 😔");
        return;
      }

      const id = hidr.id_producto;
      const idUsuario = auth.user.idUsuario;

      if (!idUsuario) {
        alert('Error: Usuario no identificado');
        return;
      }

      try {
        await axios.post('http://127.0.0.1:8000/api/carrito/agregar', {
          idUsuario: idUsuario,
          id_producto: id,
          cantidad: 1
        });

        hidr.cantidad = Math.max(0, hidr.cantidad - 1);
        console.log(`Producto ${hidr.nombre} agregado al carrito`);
        alert('Producto agregado al carrito ✅');
      } catch (error) {
        console.error('Error al agregar al carrito:', error);
        alert('No se pudo agregar al carrito. Intenta de nuevo.');
      }
    }
  }
}
</script>

<style scoped>
.contenedor {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  width: 200px;
  position: relative;
}

.imagen-hidrobombas {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
}

.nombre {
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
}

.precio {
  color: #e74c3c;
  font-size: 18px;
  margin: 10px 0;
}

.calificacion {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.botones {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-compra {
  flex: 1;
}

.btn-deshabilitado {
  flex: 1;
  opacity: 0.5;
}

.tag-flotante {
  position: absolute;
  top: 10px;
  right: 10px;
}

.disponible {
  background-color: #d4edda;
  color: #155724;
}

.agotado {
  background-color: #f8d7da;
  color: #721c24;
}

.casi_agotado {
  background-color: #fff3cd;
  color: #856404;
}
</style>