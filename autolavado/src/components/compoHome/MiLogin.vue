<template>
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
    <button type="submit">Entrar</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>


    <p class="registro-texto">
    ¿Eres nuevo usuario? Click acá.
    <a href="#" class="registro-link">Registrar</a>
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
    error: ''
    }
},
methods: {
    login() {
    if (this.username === 'admin' && this.password === 'admin1234') {
        this.$router.push('/home');
    } else {
        this.error = 'Usuario o contraseña incorrectos';
    }
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