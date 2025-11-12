import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: []
  }),

  actions: {
    async loadCart(userId) {
      const res = await axios.get(`http://127.0.0.1:8000/api/cart/${userId}`)
      this.cartItems = res.data || []
    },
    async addToCart(item) {
      this.cartItems.push(item)
    },
    clearCart() {
    
      this.$reset()
    }
  }
})