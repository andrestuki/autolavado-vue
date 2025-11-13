<template>
    <div class="signup-page-bg">
        <div class="signup">
            <h2>Crear Cuenta</h2>
            <form @submit.prevent="signup">
                <div>
                    <label>Usuario:</label>
                    <input v-model="formData.username" type="text" required placeholder="Ingresa tu usuario"
                        @blur="validateUsername" />
                    <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
                </div>

                <div>
                    <label>Email:</label>
                    <input v-model="formData.email" type="email" required placeholder="ejemplo@correo.com"
                        @blur="validateEmail" />
                    <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input v-model="formData.password" type="password" required placeholder="Mínimo 6 caracteres"
                        @blur="validatePassword" />
                    <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
                </div>

                <div>
                    <label>Confirmar Contraseña:</label>
                    <input v-model="formData.confirmPassword" type="password" required
                        placeholder="Repite tu contraseña" @blur="validateConfirmPassword" />
                    <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>
                </div>

                <div>
                    <label>Nombre Completo:</label>
                    <input v-model="formData.fullName" type="text" placeholder="Tu nombre completo (opcional)" />
                </div>

                <button type="submit" :disabled="loading || !isFormValid">
                    {{ loading ? "Registrando..." : "Registrarse" }}
                </button>
            </form>

            <p v-if="error" class="error-text error-alert">{{ error }}</p>
            <p v-if="success" class="success-text">{{ success }}</p>

            <p class="login-texto">
                ¿Ya tienes cuenta?
                <router-link to="/login" class="login-link">Inicia Sesión</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
    name: "SignupView",
    data() {
        return {
            formData: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                fullName: "",
            },
            errors: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            error: "",
            success: "",
            loading: false,
        };
    },
    computed: {
        isFormValid() {
            return (
                this.formData.username &&
                this.formData.email &&
                this.formData.password &&
                this.formData.confirmPassword &&
                this.formData.password === this.formData.confirmPassword &&
                !this.errors.username &&
                !this.errors.email &&
                !this.errors.password &&
                !this.errors.confirmPassword
            );
        },
    },
    methods: {
        validateUsername() {
            const username = this.formData.username.trim();
            
            // Validar longitud
            if (username.length < 3) {
                this.errors.username = "El usuario debe tener al menos 3 caracteres";
                return;
            }
            
            // Validar formato
            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                this.errors.username = "El usuario solo puede contener letras, números y guiones bajos";
                return;
            }
            
            // Validar que no exista otro usuario con el mismo nombre
            const usuariosJSON = localStorage.getItem("usuarios");
            const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
            
            if (usuarios.some(u => u.usuario === username)) {
                this.errors.username = "Este usuario ya existe";
                return;
            }
            
            this.errors.username = "";
        },

        validateEmail() {
            const email = this.formData.email.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                this.errors.email = "Por favor, ingresa un email válido";
                return;
            }
            
            // Validar que no exista otro usuario con el mismo email
            const usuariosJSON = localStorage.getItem("usuarios");
            const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
            
            if (usuarios.some(u => u.email === email)) {
                this.errors.email = "Este email ya está registrado";
                return;
            }
            
            this.errors.email = "";
        },

        validatePassword() {
            const password = this.formData.password;
            if (password.length < 6) {
                this.errors.password = "La contraseña debe tener al menos 6 caracteres";
            } else {
                this.errors.password = "";
            }
            if (this.formData.confirmPassword) {
                this.validateConfirmPassword();
            }
        },

        validateConfirmPassword() {
            if (this.formData.password !== this.formData.confirmPassword) {
                this.errors.confirmPassword = "Las contraseñas no coinciden";
            } else {
                this.errors.confirmPassword = "";
            }
        },

        signup() {
            this.validateUsername();
            this.validateEmail();
            this.validatePassword();
            this.validateConfirmPassword();

            if (!this.isFormValid) {
                this.error = "Por favor, completa el formulario correctamente";
                return;
            }

            const authStore = useAuthStore();
            this.error = "";
            this.success = "";
            this.loading = true;

            // Simulamos un pequeño delay para que se vea más realista
            setTimeout(() => {
                try {
                    // Obtener usuarios del localStorage
                    const usuariosJSON = localStorage.getItem("usuarios");
                    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

                    // Generar un ID único para el nuevo usuario
                    const idUsuario = usuarios.length > 0 
                        ? Math.max(...usuarios.map(u => u.idUsuario)) + 1 
                        : 1;

                    // Crear el nuevo usuario
                    const nuevoUsuario = {
                        idUsuario: idUsuario,
                        idPerfil: 3, // Perfil por defecto (cliente) - 1=Admin, 2=Trabajador, 3=Cliente
                        usuario: this.formData.username.trim(),
                        email: this.formData.email.trim(),
                        password: this.formData.password, // En producción, hashear la contraseña
                        fullName: this.formData.fullName || "",
                        fechaRegistro: new Date().toISOString(),
                    };

                    // Agregar el nuevo usuario al array
                    usuarios.push(nuevoUsuario);

                    // Guardar en localStorage
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));

                    this.success = "¡Cuenta creada exitosamente! Redirigiendo...";
                    console.log(" Usuario registrado:", nuevoUsuario.usuario);

                    // Hacer login automático
                    authStore.login({
                        idUsuario: nuevoUsuario.idUsuario,
                        idPerfil: nuevoUsuario.idPerfil,
                        usuario: nuevoUsuario.usuario,
                        email: nuevoUsuario.email,
                    });

                    // Redirigir después de 2 segundos
                    setTimeout(() => {
                        this.$router.push("/inicio");
                    }, 2000);
                } catch (err) {
                    console.error(" Error al registrarse:", err);
                    this.error = "Error inesperado: " + err.message;
                } finally {
                    this.loading = false;
                }
            }, 800);
        },
    },
    mounted() {
        // Si ya hay sesión activa, redirigir al inicio
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
            this.$router.push("/home");
        }
    },
};
</script>

<style scoped>
.signup-page-bg {
    background: url('@/assets/imagenesHome/fondooojpeg.jpeg') no-repeat center;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.signup {
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
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
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

.success-text {
    color: #27ae60;
    font-size: 13px;
    text-align: center;
    padding: 10px;
    background-color: #d5f4e6;
    border-radius: 4px;
    font-weight: 500;
}

.login-texto {
    text-align: center;
    margin-top: 20px;
    color: #777;
    font-size: 14px;
}

.login-link {
    color: #cc2009;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.login-link:hover {
    color: #764ba2;
    text-decoration: underline;
}

@media (max-width: 600px) {
    .signup {
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
