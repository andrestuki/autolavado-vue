<template>
  <header>
    <div class="red-figure"></div>
    <nav class="menu">
      <div class="logo">
        <router-link to="/inicio"><img src="../../assets/imagenesHome/logo.png" alt="Logo"></router-link>
      </div>
      <ul>
        <li><router-link to="/inicio">Inicio</router-link></li>
        <li>Lavado de autos</li>
        <li>Tienda</li>
        <li>Contacto</li>

        <!-- Mostrar registrar solo si no hay usuario logueado -->
        <li v-if="!isLoggedIn"><router-link :to="{ path: '/login', query: { register: '1' } }">Registrarse</router-link></li>

        <!-- Mostrar Admin solo si el usuario actual es admin -->
        <li v-if="isAdmin"><router-link to="/global">Admin</router-link></li>

        <!-- Si hay usuario logueado mostrar saludo y logout -->
        <li v-if="isLoggedIn" class="saludo">Hola, {{ currentUser?.username || '' }}</li>
        <li v-if="isLoggedIn" @click="logout" class="logout">Cerrar sesión</li>

        <!-- Carrito -->
        <li class="carrito"><router-link to="/cart">🛒 <span class="count">{{ cartCount }}</span></router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MiHeader',
  data() {
    return {
      currentUser: null,
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.currentUser && !!this.currentUser.username;
    },
    isAdmin() {
      return !!this.currentUser && this.currentUser.username === 'admin';
    },
    cartCount() {
      try {
        const c = JSON.parse(localStorage.getItem('cart')) || [];
        return c.reduce((s, it) => s + (it.quantity || it.qty || 1), 0);
      } catch (e) {
        return 0;
      }
    }
  },
  mounted() {
    // escucha cambios en localStorage (si otro tab hace login/logout)
    window.addEventListener('storage', this.onStorageChange);
    // inicializar currentUser desde localStorage
    try {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
      this.currentUser = null;
    }
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.onStorageChange);
  },
  methods: {
    onStorageChange() {
      // fuerza re-evaluación leyendo el valor actual
      try {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } catch (e) {
        this.currentUser = null;
      }
      // forzar reactivity del contador de carrito
      this.$forceUpdate && this.$forceUpdate();
    },
    logout() {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      // notificar otros componentes
      try {
        window.dispatchEvent(new Event('storage'));
      } catch (e) {
        console.warn('dispatch storage event failed', e);
      }
      // redirigir a inicio o login
      this.$router.push('/login');
    },
  },
};
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

/* Unificar hover para enlaces y elementos de lista */
.menu ul a:hover,
.menu ul li:hover {
  background-color: rgb(224, 25, 25);
}

.menu ul li {
  padding: 13px;
  border-radius: 20px;
  transition: ease-in-out 200ms;
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
