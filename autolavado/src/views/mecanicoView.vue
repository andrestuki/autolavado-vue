<template>
  <MecanicoHeader></MecanicoHeader>
  <MiFooter></MiFooter>
</template>

<script>
import MiFooter from '@/components/compoHome/MiFooter.vue';
import MecanicoHeader from '@/components/compoMecanico/MecanicoHeader.vue';



// @ is an alias to /src



export default {
  name: 'mecanicoView',
  components: {
    MecanicoHeader,
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