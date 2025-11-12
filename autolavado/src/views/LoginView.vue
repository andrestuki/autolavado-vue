<template>
  <div class="login-page-bg">
    <!-- Notificación de éxito -->
    <div v-if="mostrarNotificacion" class="toast toast-success">
      <div class="toast-content">
        <span class="toast-icon">✅</span>
        <div class="toast-texto">
          <p class="toast-titulo">¡Login Exitoso!</p>
          <p class="toast-mensaje">Bienvenido, {{ username }}</p>
        </div>
      </div>
    </div>

    <div class="login">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label>Usuario:</label>
          <input v-model="username" type="text" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Cargando..." : "Entrar" }}
        </button>
      </form>

      <p v-if="error" class="error-text">{{ error }}</p>

      <p class="registro-texto">
        ¿Eres nuevo usuario? Click acá.
        <router-link to="/signup" class="registro-link">Registrar</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "MiLogin",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
      mostrarNotificacion: false,
    };
  },
  methods: {
    login() {
      const authStore = useAuthStore();
      this.error = "";
      this.loading = true;

      // Simulamos un pequeño delay para que se vea más realista
      setTimeout(() => {
        try {
          // Obtener todos los usuarios registrados del localStorage
          const usuariosJSON = localStorage.getItem("usuarios");
          const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

          // Buscar si existe un usuario con esas credenciales
          const usuarioEncontrado = usuarios.find(
            (u) => u.usuario === this.username && u.password === this.password
          );

          if (usuarioEncontrado) {
            // Login exitoso: guardar el usuario actual
            authStore.login({
              idUsuario: usuarioEncontrado.idUsuario,
              idPerfil: usuarioEncontrado.idPerfil,
              usuario: usuarioEncontrado.usuario,
              email: usuarioEncontrado.email,
            });

            // Mostrar notificación
            this.mostrarNotificacion = true;
            console.log("✅ Login exitoso para usuario:", this.username);

            // Redirigir después de 2 segundos
            setTimeout(() => {
              this.$router.push("/inicio");
            }, 2000);
          } else {
            this.error = "Usuario o contraseña incorrectos";
            console.warn("❌ Credenciales inválidas");
          }
        } catch (err) {
          console.error("❌ Error al iniciar sesión:", err);
          this.error = "Error inesperado: " + err.message;
        } finally {
          this.loading = false;
        }
      }, 800);
    },
  },
  mounted() {
    // Si ya hay sesión activa (guardada en localStorage)
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
body {
  overflow: hidden;
  margin: 0;
}

.login-page-bg {
  min-height: 100vh;
  background: url('@/assets/imagenesHome/fondooojpeg.jpeg') no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  max-width: 220px;
  width: 100%;
  padding: 30px 30px;
  background: rgba(249, 249, 249, 0.76);
  border-radius: 8px;
  box-shadow: 0 2px 45px #000e;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login h2 {
  margin-bottom: 20px;
  margin-top: auto;
  color: #333;
}

.login label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
}

.login input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login button {
  width: 50%;
  padding: 10px;
  background: #000000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  margin: 5px 0 5px 0;
  cursor: pointer;
  transition: 0.2s ease;
}

.login button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login button:hover:not(:disabled) {
  background: #333;
}

.error-text {
  color: red;
  margin-top: 5px;
  text-align: center;
}

.registro-texto {
  margin-top: 15px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.registro-link {
  color: blue;
  font-weight: bold;
  text-decoration: none;
}

.registro-link:hover {
  text-decoration: underline;
}

/* Estilos para Toast */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999;
  animation: slideInRight 0.5s ease-out;
}

.toast-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.toast-icon {
  font-size: 24px;
  font-weight: bold;
  flex-shrink: 0;
}

.toast-texto {
  flex: 1;
}

.toast-titulo {
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.toast-mensaje {
  margin: 0;
  font-size: 13px;
  opacity: 0.95;
}

/* Animación de entrada */
@keyframes slideInRight {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Animación de salida */
@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}
</style>