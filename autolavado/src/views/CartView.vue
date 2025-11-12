<template>
  <MiHeader />

  <div class="cart-page">
    <h2>🛒 Carrito de compras</h2>

    <!-- Mostrar mensaje si no hay productos -->
    <div v-if="items.length === 0" class="empty-cart">
      <p>Tu carrito está vacío 😢</p>
      <router-link to="/" class="btn-return">Volver a la tienda</router-link>
    </div>

    <!-- Mostrar tabla si hay productos -->
    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="prod">
              <img :src="item.image" alt="" class="thumb" />
              <span>{{ item.name }}</span>
            </td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>
              <input
                type="number"
                min="1"
                v-model.number="item.quantity"
                @change="updateCart"
              />
            </td>
            <td>{{ formatPrice(item.price * item.quantity) }}</td>
            <td>
              <button class="btn-remove" @click="remove(item.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div>Total: <strong>{{ formatPrice(total) }}</strong></div>
        <div class="actions">
          <button class="btn-checkout" @click="checkout">Finalizar compra</button>
        </div>
      </div>
    </div>
  </div>

  <MiFooter />
</template>

<script>
import MiHeader from '@/components/compoHome/MiHeader.vue';
import MiFooter from '@/components/compoHome/MiFooter.vue';

export default {
  name: 'CartView',
  components: { MiHeader, MiFooter },
  data() {
    return {
      items: []
    };
  },
  computed: {
    total() {
      return this.items.reduce((s, it) => s + (it.price * (it.quantity || 1)), 0);
    }
  },
  mounted() {
    this.load();
    // 🔄 Escuchar los cambios en el carrito (desde cualquier vista)
    window.addEventListener('storage', this.load);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.load);
  },
  methods: {
    // Cargar los productos del carrito
    load() {
      try {
        const saved = JSON.parse(localStorage.getItem('cart')) || [];
        this.items = Array.isArray(saved) ? saved : [];
      } catch (e) {
        this.items = [];
      }
    },
    // Actualizar carrito al modificar cantidad o eliminar
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
      try {
        window.dispatchEvent(new Event('storage'));
      } catch (e) {
        // ignorar errores al despachar evento
      }
    },
    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.updateCart();
    },
    formatPrice(v) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(v);
    },
    checkout() {
      if (this.items.length === 0) return;
      this.items = [];
      localStorage.removeItem('cart');
      try {
        window.dispatchEvent(new Event('storage'));
      } catch (e) {
        // ignorar errores
      }
      alert('✅ Compra realizada con éxito. ¡Gracias!');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.cart-page {
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
}
.cart-page h2 {
  text-align: center;
  color: #0F172A;
  margin-bottom: 20px;
}
.empty-cart {
  text-align: center;
  color: #555;
}
.btn-return {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background: #0F172A;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}
.cart-table th, .cart-table td {
  border: 1px solid #eee;
  padding: 10px;
  text-align: center;
}
.cart-table th {
  background-color: #f8f9fa;
  color: #333;
}
.thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 8px;
  border-radius: 6px;
}
.prod {
  display: flex;
  align-items: center;
}
.summary {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-remove {
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
}
.btn-remove:hover {
  background: #b91c1c;
}
.btn-checkout {
  padding: 10px 20px;
  background: #0F172A;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.btn-checkout:hover {
  background: #1e293b;
}
</style>
