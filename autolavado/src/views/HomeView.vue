<template>
    <MiHeader></MiHeader>
    <MiPresentacion></MiPresentacion>
    <MisProductos></MisProductos>
</template>

<script>
// @ is an alias to /src

import MiHeader from '@/components/compoHome/MiHeader.vue';
import MiPresentacion from '@/components/compoHome/MiPresentacion.vue'
import MisProductos from '@/components/compoHome/MisProductos.vue';

export default {
  name: 'HomeView',
  components: {
    MiHeader,
    MiPresentacion,
    MisProductos,
  }
}
</script>
