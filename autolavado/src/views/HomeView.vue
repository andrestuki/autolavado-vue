<template>
    <MiHeader></MiHeader>
    <MiPresentacion></MiPresentacion>
    <MisProductos></MisProductos>
</template>

<script>
// @ is an alias to /src

import MiHeader from '@/components/MiHeader.vue';
import MiPresentacion from '@/components/MiPresentacion.vue'
import MisProductos from '@/components/MisProductos.vue';

export default {
  name: 'HomeView',
  components: {
    MiHeader,
    MiPresentacion,
    MisProductos,
  }
}
</script>
