<template>
    <div class="container">
        <h2 v-if='getPortfolios.length === 0'>Please purchase a stock to add to your portfolio.</h2>
        <app-base-box 
            v-for='portfolio in getPortfolios' 
            btnColor="btn-red"
            btnText='sell'
            :company='portfolio' 
            :key='portfolio.name'
            boxColor='red' />
    </div>
</template>
<script>
import BaseBox from './BaseBox.vue'
import { mapGetters } from 'vuex'

export default {
    
    components: {
        appBaseBox: BaseBox
    },  
    computed: {
        ...mapGetters([
            'getPortfolios'
        ])
    }
}
</script>
<style lang='scss' scoped>

    .container {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1.5rem;
    }
    
</style>