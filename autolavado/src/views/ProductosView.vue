<template>
  <MiHeader></MiHeader>
  <DataView>

  </DataView>
  <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue'
import MiHeader from '@/components/compoHome/MiHeaderNew.vue';


export default {
  name: 'productosView',
  components: {
    MiHeader,
    MiFooter
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