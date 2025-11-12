<template>
  <header>
    <div class="red-figure"></div>
    <nav class="menu">
      <div class="logo">
        <a href=""><img src="../../assets/imagenesHome/logo.png" alt="Logo"></a>
      </div>
      <ul>
        <router-link to="/inicio">
          <li>Inicio</li>
        </router-link>
        <li>Tienda</li>
        <!-- Enlace al carrito de compras -->
        <router-link to="/cart">
          <li>
            <i class="pi pi-shopping-cart" style="margin-right:8px"></i>
            Carrito
          </li>
        </router-link>
        <router-link v-if="!isLogged" to="/registro">
          <li>Registrarse</li>
        </router-link>
        <router-link v-if="isAdmin" to="/global">
          <li>Admin</li>
        </router-link>
        
        <!-- Mostrar avatar y nombre solo si está logueado -->
        <div v-if="isLogged" class="user-area">
          <OverlayBadge value="4" severity="danger" class="inline-flex">
            <AvatarPrime icon="pi pi-user" size="xlarge" />
          </OverlayBadge>
          <div class="username">{{ displayName }}</div>

          <ButtonPrime class="logout-btn" label="Cerrar sesión" @click="logout" />
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { useRouter } from 'vue-router';

export default {
  name: "MiHeader",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const isAdmin = computed(() => authStore.user?.idPerfil === 1);
    const isLogged = computed(() => !!authStore.user);
    const user = computed(() => authStore.user);

    // Nombre a mostrar: prueba varias propiedades posibles
    const displayName = computed(() => {
      const u = authStore.user;
      if (!u) return '';
      return u.nombre || u.nombreCompleto || u.fullName || u.usr || u.usuario || u.email || u.gmail || 'Usuario';
    });

    function logout() {
      authStore.logout();
      router.push('/inicio');
    }

    return { isAdmin, isLogged, user, displayName, logout };
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

.menu ul a:hover{
  background-color: rgb(224, 25, 25);
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

/* Nuevo estilo para área de usuario */
.user-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  color: white;
}

.username {
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 110px;
  text-align: center;
}

/* estilo para el boton cerrar sesion */
.logout-btn {
  margin-top: 6px;
  padding: 6px 10px;
  font-size: 13px;
  background-color: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
}
.logout-btn:hover {
  background-color: rgba(255,255,255,0.08);
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
