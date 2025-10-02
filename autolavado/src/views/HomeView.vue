<template>
    <MiHeader></MiHeader>
    <MiPresentacion></MiPresentacion>
    <SobreNosotros></SobreNosotros>
    <MisProductos></MisProductos>
    <MisPaquetes></MisPaquetes>
    <MiFooter></MiFooter>

</template>

<script>
// @ is an alias to /src

import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeader.vue';
import MiPresentacion from '@/components/compoHome/MiPresentacion.vue'
import MisPaquetes from '@/components/compoHome/MisPaquetes.vue';
import MisProductos from '@/components/compoHome/MisProductos.vue';
import SobreNosotros from '@/components/compoHome/SobreNosotros.vue';


export default {
  name: 'HomeView',
  components: {
    MiHeader,
    MiPresentacion,
    MisProductos,
    MiFooter,
    MisPaquetes,
    SobreNosotros
  }
}
</script>
