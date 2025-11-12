<template>
  <MiHeader />

  <div class="carrito">
    <h2>🛒 Tu carrito</h2>

    <div v-if="carrito.length === 0" class="vacio">
      <p>No tienes productos en el carrito.</p>
    </div>

    <div v-else>
      <table class="tabla-carrito">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carrito" :key="item.id_detalle">
            <td>{{ item.producto }}</td>
            <td>{{ item.cantidad }}</td>
            <td>${{ Number(item.precio).toLocaleString('es-CO') }}</td>
            <td>${{ Number(item.subtotal).toLocaleString('es-CO') }}</td>
            <td>
              <button @click="eliminar(item.id_producto)" class="btn-eliminar">❌ Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="resumen">
        <h3>Total: ${{ Number(total).toLocaleString('es-CO') }}</h3>
        <button @click="finalizarCompra" class="btn-finalizar">Finalizar compra</button>
      </div>
    </div>
  </div>

  <MiFooter />
</template>

<script setup>
import MiHeader from '@/components/compoHome/MiHeader.vue'
import MiFooter from '@/components/compoHome/MiFooter.vue'
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useAuthStore } from '@/stores/auth'

const API_URL = "http://127.0.0.1:8000/api";

const auth = useAuthStore();

console.log('Auth user completo:', auth.user);
console.log('Propiedades del user:', Object.keys(auth.user || {}));
console.log('auth.user.idUsuario:', auth.user?.idUsuario);

const idUsuario = computed(() => {
  return auth.user?.idUsuario || null;
});

console.log('ID usuario computed:', idUsuario.value);

const carrito = ref([]);

const cargarCarrito = async () => {
  if (!idUsuario.value) {
    console.error('⚠️ No hay idUsuario disponible');
    return;
  }
  try {
    const res = await axios.get(`${API_URL}/carrito/ver/${idUsuario.value}`);
    console.log('Respuesta carrito:', res.data);
    let datos = res.data;
    if (!Array.isArray(datos)) {
      datos = datos?.items || datos?.carrito || [];
    }
    carrito.value = datos;
  } catch (error) {
    console.error("Error al cargar carrito:", error);
    carrito.value = [];
  }
};

const eliminar = async (idProducto) => {
  if (!idUsuario.value) {
    alert('Error: Usuario no identificado');
    return;
  }

  const payload = { 
    idUsuario: idUsuario.value, 
    id_producto: idProducto 
  };

  console.log('Payload DELETE:', JSON.stringify(payload));

  try {
    await axios.delete(`${API_URL}/carrito/eliminar`, {
      data: payload
    });
    
    await cargarCarrito();
    alert('Producto eliminado ✅');
  } catch (error) {
    console.error("Error completo:", error);
    console.error("Response data:", error.response?.data);
    alert('No se pudo eliminar: ' + (error.response?.data?.detail || error.message));
  }
};

const finalizarCompra = async () => {
  if (!idUsuario.value) {
    alert('Error: Usuario no identificado');
    return;
  }

  try {
    await axios.post(`${API_URL}/carrito/finalizar`, { 
      idUsuario: idUsuario.value 
    });
    carrito.value = [];
    alert("Compra finalizada correctamente ✅");
  } catch (error) {
    console.error("Error al finalizar:", error);
    alert('Error: ' + (error.response?.data?.detail || error.message));
  }
};

const total = computed(() => {
  const arr = Array.isArray(carrito.value) ? carrito.value : [];
  return arr.reduce((acc, item) => {
    const subtotal = Number(item.subtotal ?? 0) || (Number(item.precio ?? 0) * Number(item.cantidad ?? 0));
    return acc + subtotal;
  }, 0);
});

onMounted(() => {
  cargarCarrito();
});
</script>

<style scoped>
.carrito {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.vacio {
  text-align: center;
  padding: 40px;
  color: #666;
}

.tabla-carrito {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla-carrito th,
.tabla-carrito td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.tabla-carrito th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.tabla-carrito tr:hover {
  background-color: #f9f9f9;
}

.btn-eliminar {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-eliminar:hover {
  background: #c0392b;
}

.resumen {
  text-align: right;
  border-top: 2px solid #ddd;
  padding-top: 20px;
}

.resumen h3 {
  font-size: 24px;
  color: #e74c3c;
  margin-bottom: 15px;
}

.btn-finalizar {
  padding: 12px 30px;
  font-size: 16px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-finalizar:hover {
  background: #229954;
}
</style>
