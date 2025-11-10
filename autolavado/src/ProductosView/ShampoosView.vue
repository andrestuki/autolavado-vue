<template>
    <MiHeader></MiHeader>
    <div class="contenedor">
        <div v-for="shamp in shampoos" :key="shamp.id_producto || shamp.id_shampoos || shamp.id_shampoo" class="card">
            <TagPrime v-if="(shamp.cantidad >= 10)" class="tag-flotante disponible" severity="success">En stock</TagPrime>
            <TagPrime v-else-if="(shamp.cantidad == 0)" class="tag-flotante agotado" severity="secondary">Agotado</TagPrime>
            <TagPrime v-else-if="(shamp.cantidad >= 1 && shamp.cantidad < 10)" class="tag-flotante casi_agotado" severity="secondary">Casi Agotado</TagPrime>

            <img class="imagen-shampoos" :src="`/imagenesShampoos/${shamp.imagen}`" alt="">
            <h4 class="nombre">{{ shamp.nombre }} 
                <h4 class="calificacion">
                    <span class="text-surface-900 font-medium text-sm">{{ shamp.raiting }}</span>
                    <i class="pi pi-star-fill text-yellow-500"></i>
                </h4>
            </h4>

            <div class="fila-info">
                <h4 class="precio">{{ pesoCOL(shamp.precio) }}</h4>
            </div>

            <div class="botones">
    <ButtonPrime 
      :class="shamp.cantidad > 0 ? 'btn-compra' : 'btn-deshabilitado'"
      :disabled="shamp.cantidad <= 0"
      @click="addToCart(shamp)"
      icon="pi pi-shopping-cart"
      label="AGREGAR AL CARRITO" />
    <ButtonPrime 
      v-if="(shamp.cantidad >= 0)" 
      icon="pi pi-heart" 
      variant="outlined" 
      class="btn-favorito edit" />
  </div>
        </div>
    </div>
    <MiFooter></MiFooter>
</template>

<script>
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    loading: false,
    error: null
  }),

  actions: {
    async addToCart(productId, quantity = 1) {
      try {
        const userId = localStorage.getItem('userId'); // Get logged user ID
        await axios.post('http://127.0.0.1:8000/api/cart/add', {
          idUsuario: userId,
          id_producto: productId,
          cantidad: quantity
        });
        await this.loadCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    },

    async loadCart() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://127.0.0.1:8000/api/cart/${userId}`);
        this.cartItems = response.data;
      } catch (error) {
        console.error('Error loading cart:', error);
        this.error = error.message;
      }
    },

    async checkout() {
      try {
        const userId = localStorage.getItem('userId');
        await axios.post(`http://127.0.0.1:8000/api/cart/checkout/${userId}`);
        this.cartItems = [];
      } catch (error) {
        console.error('Error during checkout:', error);
        throw error;
      }
    }
  },

  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + item.subtotal, 0);
    }
  }
});
</script>


<style scoped>
.contenedor {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.card {
    background-color: white;

    border: rgb(198, 198, 204) solid 1px;
    width: 350px;
    height: 370px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.imagen-shampoos {

    width: 75%;
    height: 60%;
    margin-bottom: 15px;
}

.nombre {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 0 25px;
    margin-bottom: 10px;
    color: #333;

}

.fila-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin-bottom: 10px;
}

.precio {
    font-size: 20px;
    margin: 0;
}

.calificacion {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 15px;

}

.botones {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin-bottom: 10px;
}

.btn-compra {
    width: 270px;
    height: 30px;
    gap: 10px;
    border-radius: 5px;
    background-color: #0F172A;
    color: #FFFFFF;
}

.btn-deshabilitado {
    width: 270px;
    height: 30px;
    gap: 10px;
    border-radius: 5px;
    background-color: #5f5f5f;
    pointer-events: none;
    color: #FFFFFF;
}

.btn-compra:hover {
    background-color: #2A3445 !important;
    color: #FFFFFF !important;
    transition: background-color 0.3s ease;
}

.btn-favorito {
    position: relative;
    padding: 5px;
    left: 5px;
    background-color: white;
    color: #0F172A;
    border: rgb(170, 170, 173) solid 1px;
    border-radius: 5px;

}

.btn-favorito:hover {
    background-color: #2A3445 !important;
    color: #FFFFFF !important;
    transition: background-color 0.3s ease;
}


.tag-flotante {
    position: absolute;
    top: 10px;
    right: 230px;
    font-weight: bold;
    font-size: 14px;
    width: 100px;
    height: 27px;
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
    color: white;
}
</style>