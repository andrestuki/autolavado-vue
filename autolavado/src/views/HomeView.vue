<template>
    <MiHeader></MiHeader>
    <MiPresentacion></MiPresentacion>
</template>

<script>
// @ is an alias to /src

import MiHeader from '@/components/MiHeader.vue';
import MiPresentacion from '@/components/MiPresentacion.vue'

export default {
  name: 'HomeView',
  components: {
    MiHeader,
    MiPresentacion,
  }
}
</script>
