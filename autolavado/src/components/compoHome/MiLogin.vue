<template>
<div class="login">
    <h2 v-if="!showRegister">Iniciar Sesión</h2>
    <h2 v-else>Registro de Usuario</h2>

    <form v-if="!showRegister" @submit.prevent="login">
    <div>
        <label>Usuario:</label>
        <input v-model="username" type="text" required />
    </div>
    <div>
        <label>Contraseña:</label>
        <input v-model="password" type="password" required />
    </div>
    <button type="submit">Entrar</button>
    </form>

    <form v-else @submit.prevent="register">
    <div>
        <label>Usuario:</label>
        <input v-model="regUsername" type="text" required />
    </div>
    <div>
        <label>Contraseña:</label>
        <input v-model="regPassword" type="password" required />
    </div>
    <div>
        <label>Repetir Contraseña:</label>
        <input v-model="regPassword2" type="password" required />
    </div>
    <button type="submit">Registrar</button>
    </form>

    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">{{ success }}</p>

    <p class="registro-texto">
    <span v-if="!showRegister">¿Eres nuevo usuario? <a href="#" @click.prevent="toggleRegister" class="registro-link">Registrar</a></span>
    <span v-else>¿Ya tienes cuenta? <a href="#" @click.prevent="toggleRegister" class="registro-link">Iniciar Sesión</a></span>
    </p>
</div>
</template>

<script>
export default {
name: 'MiLogin',
data() {
    return {
    username: '',
    password: '',
    regUsername: '',
    regPassword: '',
    regPassword2: '',
    error: '',
    success: '',
    showRegister: false
    }
},
mounted() {
    // si la ruta tiene ?register=1, abrir formulario de registro
    if (this.$route && this.$route.query && this.$route.query.register === '1') {
    this.showRegister = true;
    }
},
watch: {
    '$route.query.register'(val) {
    this.showRegister = val === '1';
    }
},
methods: {
    toggleRegister() {
    this.error = '';
    this.success = '';
    this.showRegister = !this.showRegister;
    },
    login() {
    this.error = '';
    // revisar autenticación en localStorage
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // comprobar usuario admin por defecto
    if (this.username === 'admin' && this.password === 'admin1234') {
        // mostrar mensaje y redirigir
        this.success = 'Inicio de sesión correcto. Redirigiendo...';
    setTimeout(() => {
    localStorage.setItem('currentUser', JSON.stringify({ username: 'admin' }));
    // notificar cambios a otros componentes
    try { window.dispatchEvent(new Event('storage')); } catch (e) { console.warn('dispatch storage event failed', e); }
    this.$router.push('/');
    }, 700);
        return;
    }

    const found = users.find(u => u.username === this.username && u.password === this.password);
    if (found) {
        this.success = 'Inicio de sesión correcto. Redirigiendo...';
    setTimeout(() => {
    localStorage.setItem('currentUser', JSON.stringify({ username: found.username }));
    // notificar cambios a otros componentes
    try { window.dispatchEvent(new Event('storage')); } catch (e) { console.warn('dispatch storage event failed', e); }
    this.$router.push('/');
    }, 700);
    } else {
        this.error = 'Usuario o contraseña incorrectos';
    }
    },
    register() {
    this.error = '';
    this.success = '';
    const username = this.regUsername && this.regUsername.trim();
    const password = this.regPassword;
    const password2 = this.regPassword2;

    if (!username) {
        this.error = 'El nombre de usuario es obligatorio';
        return;
    }
    if (password.length < 4) {
        this.error = 'La contraseña debe tener al menos 4 caracteres';
        return;
    }
    if (password !== password2) {
        this.error = 'Las contraseñas no coinciden';
        return;
    }

    // cargar usuarios existentes
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // comprobar si usuario ya existe
    if (users.find(u => u.username === username)) {
        this.error = 'El usuario ya existe';
        return;
    }

    // añadir usuario
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    // no iniciar sesión automáticamente: volver al formulario de login
    this.success = 'Registro exitoso. Por favor, inicie sesión.';
    // limpiar campos de registro
    this.regUsername = '';
    this.regPassword = '';
    this.regPassword2 = '';
    // mostrar mensaje y volver al formulario de login
    setTimeout(() => {
        this.showRegister = false;
    }, 700);
    }
}
}
</script>

<style scoped>
body{
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

.login button:hover {
    background: #333;
}
</style>