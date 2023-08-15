<template>
  <v-locale-provider rtl>
    <app-bar />
  </v-locale-provider>
</template>

<script>
import appBar from '@/layouts/default/Default.vue'
  export default{
    components:{
      'app-bar' : appBar
    }
  }
</script>
