<template>
    <MiHeader></MiHeader>
    <MiPresentacion></MiPresentacion>
    <MisProductos></MisProductos>
    <MiFooter></MiFooter>
</template>

<script>
// @ is an alias to /src

import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeader.vue';
import MiPresentacion from '@/components/compoHome/MiPresentacion.vue'
import MisProductos from '@/components/compoHome/MisProductos.vue';

export default {
  name: 'HomeView',
  components: {
    MiHeader,
    MiPresentacion,
    MisProductos,
    MiFooter
  }
}
</script>
