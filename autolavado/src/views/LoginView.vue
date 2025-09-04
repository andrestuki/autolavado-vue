<template>
<div class="login-page-bg">
    <MiLogin />
</div>
</template>

<script>
import MiLogin from '@/components/MiLogin.vue';

export default {
name: 'LoginView',
components: {
    MiLogin
}
}
</script>

<style scoped>
.login-page-bg {
    min-height: 100vh;
    background: url('@/assets/fondooojpeg.jpeg') no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>