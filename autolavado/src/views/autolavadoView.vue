<template>
    <AutolavadoHeader></AutolavadoHeader>
    <MiFooter></MiFooter>
</template>

<script>
import AutolavadoHeader from '@/components/compoAutolavado/AutolavadoHeader.vue';
import MiFooter from '@/components/compoHome/MiFooter.vue';



// @ is an alias to /src



export default {
  name: 'autolavadoView',
  components: {
    AutolavadoHeader,
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