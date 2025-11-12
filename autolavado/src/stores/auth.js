import { defineStore } from 'pinia'
import axios from 'axios'
import { useCartStore } from '@/stores/cart' // ajusta la ruta si tu store se llama distinto

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    idUsuario: (state) => state.user?.idUsuario || null,
  },

  actions: {
    login(userData, token = null) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      if (token) {
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      // eliminar header Authorization
      delete axios.defaults.headers.common['Authorization']

      // limpiar carrito si existe
      try {
        const cartStore = useCartStore()
        if (cartStore.$reset) cartStore.$reset()
        else cartStore.cartItems = []
      } catch (e) {
        // si no existe el store del carrito, ignorar
      }
    },
  },
})
