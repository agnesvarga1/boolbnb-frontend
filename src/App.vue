import
<script>
  
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Homepage from './components/Homepage/Hompage.vue'



export default {
  components: {
    AppHeader,
    AppFooter,
    Homepage,

  },
  data(){
      return{

      }
    },
    methods: {

    },
    mounted() {

    }
  }

</script>

<template>
  <AppHeader/>
  <Homepage/>
  <AppFooter/>
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
