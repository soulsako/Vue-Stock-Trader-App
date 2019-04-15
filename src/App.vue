<template>
  <div class='container'>
    <app-header></app-header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'

  export default {
    components: {
      appHeader: Header
    }
  }
</script>

<style scoped>
  .container {
    width: 80%;
    margin: 30px auto 0 auto;
  }
</style>

