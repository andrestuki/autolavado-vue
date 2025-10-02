<template>
  <MiHeader></MiHeader>
  <ProductosCatalogo></ProductosCatalogo>
  <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import ProductosCatalogo from '@/components/compoProductos/ProductosCatalogo.vue';
import MiHeader from '@/components/compoHome/MiHeader.vue';

// @ is an alias to /src



export default {
  name: 'productosView',
  components: {
   MiHeader,
   ProductosCatalogo,
   MiFooter
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>