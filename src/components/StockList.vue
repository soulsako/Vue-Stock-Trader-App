<template>
    <div class="container">
        <app-base-box 
            v-for='company in getCompanies' 
            btnColor="btn-green"
            btnText='buy'
            :company='company' 
            :key='company.name'
            boxColor='green' />
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
            'getCompanies'
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
