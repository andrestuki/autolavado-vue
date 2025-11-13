<template>
  <MiHeader></MiHeader>
  <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MiHeader from '@/components/compoHome/MiHeaderNew.vue';



// @ is an alias to /src



export default {
  name: 'mecanicoView',
  components: {
    MiHeader,
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