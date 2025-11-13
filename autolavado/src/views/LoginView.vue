<template>
  <div class="login-page-bg">
    <!-- Notificación de éxito -->
    <div v-if="mostrarNotificacion" class="toast toast-success">
      <div class="toast-content">
        <span class="toast-icon"></span>
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
          <input v-model="username" type="text" required placeholder="Ingresa tu usuario" />
        </div>
        <div>
          <label>Contraseña:</label>
          <input v-model="password" type="password" required placeholder="Ingresa tu contraseña" />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Cargando..." : "Entrar" }}
        </button>
      </form>

      <p v-if="error" class="error-text error-alert">{{ error }}</p>

      <p class="registro-texto">
        ¿Eres nuevo usuario?
        <router-link to="/signup" class="registro-link">Registrarse</router-link>
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
          // Limpiar espacios en blanco de las credenciales ingresadas
          const usernameLimpio = this.username.trim();
          const passwordLimpio = this.password.trim();

          // Obtener todos los usuarios registrados del localStorage
          const usuariosJSON = localStorage.getItem("usuarios");
          const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

          console.log(" Buscando usuario:", usernameLimpio);
          console.log(" Usuarios disponibles:", usuarios.map(u => ({ usuario: u.usuario, idPerfil: u.idPerfil })));

          // Buscar si existe un usuario con esas credenciales
          // Comparar sin espacios y de forma case-sensitive para usuario pero flexible para password
          const usuarioEncontrado = usuarios.find((u) => {
            const usuarioMatch = (u.usuario || "").trim() === usernameLimpio;
            const passwordMatch = (u.password || "").trim() === passwordLimpio;
            
            if (usuarioMatch && !passwordMatch) {
              console.log(" Usuario encontrado pero contraseña incorrecta");
              console.log("   Esperado:", u.password);
              console.log("   Recibido:", passwordLimpio);
            }
            
            return usuarioMatch && passwordMatch;
          });

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
            console.log(" Login exitoso para usuario:", usuarioEncontrado.usuario);
            console.log("   Perfil:", usuarioEncontrado.idPerfil === 1 ? "Admin" : usuarioEncontrado.idPerfil === 2 ? "Trabajador" : "Cliente");

            // Redirigir después de 2 segundos
            setTimeout(() => {
              this.$router.push("/inicio");
            }, 2000);
          } else {
            this.error = "Usuario o contraseña incorrectos";
            console.warn(" Credenciales inválidas");
            console.warn("   Usuario ingresado:", usernameLimpio);
            console.warn("   Contraseña ingresada:", passwordLimpio ? "***" : "(vacía)");
          }
        } catch (err) {
          console.error(" Error al iniciar sesión:", err);
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
.login-page-bg {
  background: url('@/assets/imagenesHome/fondooojpeg.jpeg') no-repeat center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  color: #555;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

input {
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus {
  outline: none;
  border-color: #c92b0f;
  box-shadow: 0 0 0 3px rgba(201, 43, 15, 0.1);
}

input:hover {
  border-color: #bbb;
}

button {
  padding: 12px 20px;
  margin-top: 10px;
  background: linear-gradient(135deg, #c00a0a 0%, #920909 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(201, 43, 15, 0.4);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  font-weight: 500;
}

.error-alert {
  background-color: #fadbd8;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
}

.registro-texto {
  text-align: center;
  margin-top: 20px;
  color: #777;
  font-size: 14px;
}

.registro-link {
  color: #cc2009;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.registro-link:hover {
  color: #920909;
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

@media (max-width: 600px) {
  .login {
    padding: 30px 20px;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 15px;
    font-size: 14px;
  }
}
</style>