<template>
  <MiHeader></MiHeader>
  <MisPulidoras></MisPulidoras>
  <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue'
import MiHeader from '@/components/compoHome/MiHeader.vue';
import MisPulidoras from '@/components/CompoPulidoras.vue/MisPulidoras.vue';


export default {
  name: 'productosView',
  components: {
    MiHeader,
    MisPulidoras,
    MiFooter,

  }
}


</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>