<template>
  <ProductosHeader></ProductosHeader>
  <ProductosCatalogo></ProductosCatalogo>
  <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import ProductosCatalogo from '@/components/compoProductos/ProductosCatalogo.vue';
import ProductosHeader from '@/components/compoProductos/ProductosHeader.vue';

// @ is an alias to /src



export default {
  name: 'productosView',
  components: {
   ProductosHeader,
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