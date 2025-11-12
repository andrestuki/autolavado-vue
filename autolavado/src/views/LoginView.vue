<template>
  <div class="login-page-bg">
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
        <a href="#" class="registro-link">Registrar</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // importa tu store de Pinia

export default {
  name: "MiLogin",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    async login() {
      const authStore = useAuthStore(); // inicializamos el store
      this.error = "";
      this.loading = true;

      try {
        // Petición al backend (ajusta la URL según tu API)
        const response = await axios.post("http://127.0.0.1:8000/api/login/login", {
            usuario: this.username,   // 👈 nota: backend espera "usuario", no "username"
            password: this.password,
        });

const data = response.data;

if (data.success) {
  // Guarda el usuario en Pinia o localStorage
  authStore.login({
    idUsuario: data.idUsuario,
    idPerfil: data.idPerfil,
  });

  this.$router.push("/inicio");
} else {
  this.error = data.mensaje || "Usuario o contraseña incorrectos";
}
      } catch (err) {
  console.error("Error al iniciar sesión:", err);
  if (err.response) {
    if (err.response.status === 401) {
      this.error = "Usuario o contraseña incorrectos";
    } else {
      this.error = `Error ${err.response.status}: ${err.response.data?.detail || 'Error desconocido'}`;
    }
  } else if (err.request) {
    this.error = "No se pudo conectar al servidor";
  } else {
    this.error = "Error inesperado: " + err.message;
  }
} finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    // Si ya hay sesión activa (guardada en Pinia o localStorage)
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
  cursor: pointer;
}

.registro-link:hover {
  text-decoration: underline;
}
.login-page-bg {
    min-height: 100vh;
    background: url('@/assets/imagenesHome/fondooojpeg.jpeg') no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

