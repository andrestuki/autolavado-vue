<template>
    <header>
        <div class="red-figure" aria-hidden="true"></div>
        <nav class="menu" role="navigation" aria-label="Main navigation">
            <div class="logo">
                <a href=""><img src="../../assets/imagenesHome/logo.png" alt="Logo" /></a>
            </div>

            <ul class="nav-links">
                <li><router-link to="/inicio">Inicio</router-link></li>
                <li><a href="#" @click.prevent="desplazarATienda" class="nav-label">Tienda</a></li>
                <li><router-link to="/cart"><i class="pi pi-shopping-cart" aria-hidden="true"
                            style="margin-right:8px"></i>Carrito</router-link></li>
                <li v-if="!isLogged"><router-link to="/login">Iniciar sesión</router-link></li>
                <li v-if="!isLogged"><router-link to="/signup">Registrarse</router-link></li>
                <li v-if="isAdmin"><router-link to="/global">Admin</router-link></li>
            </ul>

            <div v-if="isLogged" class="user-area">
                <div class="username">{{ displayName }}</div>
                <ButtonPrime class="logout-btn" label="Cerrar sesión" @click="logout" />
            </div>
        </nav>
    </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
    name: "MiHeaderNew",
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        const isAdmin = computed(() => authStore.user?.idPerfil === 1);
        const isLogged = computed(() => !!authStore.user);

        const displayName = computed(() => {
            const u = authStore.user;
            if (!u) return "";
            return (
                u.nombre || u.nombreCompleto || u.fullName || u.usr || u.usuario || u.email || u.gmail || "Usuario"
            );
        });

        function logout() {
            authStore.logout();
            router.push("/inicio");
        }

        function desplazarATienda() {
            // Si estamos en la página de inicio, hacer scroll directamente
            if (router.currentRoute.value.path === '/inicio' || router.currentRoute.value.path === '/') {
                const seccionProductos = document.getElementById('tienda-productos');
                if (seccionProductos) {
                    seccionProductos.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                // Si estamos en otra página, navegar a inicio y luego hacer scroll
                router.push('/inicio').then(() => {
                    // Esperar a que la página se cargue antes de hacer scroll
                    setTimeout(() => {
                        const seccionProductos = document.getElementById('tienda-productos');
                        if (seccionProductos) {
                            seccionProductos.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                });
            }
        }

        return { isAdmin, isLogged, displayName, logout, desplazarATienda };
    },
};
</script>

<style scoped>
header {
    background-color: rgb(43, 43, 43);
    color: white;
}

.red-figure {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background: rgb(135, 9, 9);
    clip-path: path("M0,0 200,0 60,80 70,150 L0,200 Z");
    z-index: 0;
}

.menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 2rem;
    position: relative;
    z-index: 2;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    height: 72px;
    width: auto;
    border-radius: 50%;
}

.nav-links {
    display: flex;
    gap: 30px;
    align-items: center;
    margin: 0;
    padding: 0;
}

.nav-links li {
    list-style: none;
    font-weight: 700;
}

.nav-links a {
    color: white;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 16px;
    cursor: pointer;
}

.nav-links a:hover {
    background-color: rgb(224, 25, 25);
}

.nav-label {
    cursor: pointer;
}

.user-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: white;
}

.username {
    font-size: 14px;
    font-weight: 600;
    max-width: 140px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.logout-btn {
    margin-top: 6px;
    padding: 6px 10px;
    font-size: 13px;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
}

.logout-btn:hover {
    background-color: rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
    .menu {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .logo img {
        height: 56px;
    }

    .nav-links {
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }

    .nav-links a {
        display: block;
        width: 100%;
        padding: 10px 14px;
    }

    .user-area {
        flex-direction: row;
        align-items: center;
        gap: 12px;
        width: 100%;
        justify-content: space-between;
    }

    .username {
        max-width: 120px;
        text-align: left;
    }
}
</style>
