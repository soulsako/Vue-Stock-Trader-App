<template>
    <nav class='nav clearfix'>
        <div class='nav__logo'>Stock Trader</div>
        <ul class="nav__list">         
            <router-link 
                to='/portfolio' 
                tag='li' 
                class="nav__list-listItem" 
                active-class='active' exact>Portfolio</router-link>
            <router-link 
                to='/stocks' 
                tag='li'
                active-class='active' 
                class="nav__list-listItem">Stocks</router-link>
            <router-link 
                to='/end-day' 
                tag='li'
                active-class='active' 
                class="nav__list-listItem"
                @click.native='endDay'>End Day</router-link>
            <li class="nav__list-listItem">Save & Load</li>     
                <select name="saveAndLoad" id="saveAndLoad">
                    <option value="save">Save</option>
                    <option value="load">Load</option>
                </select>          
            <li class="nav__list-listItem"><strong>Funds: ${{ this.$store.state.funds }}.00</strong></li>          
        </ul>
    </nav>
</template>
<script>

import { mapActions } from 'vuex'
export default {
  
    methods: {
        ...mapActions([
            'dayEnded'
        ]), 
        endDay(){
						const emptyArray = [[], [], [], []];
						const randomNumbers = this.generateRandomNumbers(emptyArray);
						this.dayEnded(randomNumbers);
        },
        generateRandomNumbers(emptyArray){
            return emptyArray.map(curr => {
							return Math.floor(Math.random() * (15 + 15 + 1)) - 15;
						});
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../mixins/mixins';
    .nav {
        padding: 1rem;
        background-color: #eee;
        font-size: 1.6rem;
        @include clearfix;
        border-radius: 5px;
        
        &__logo {
            margin-right: 2.5rem;
            font-size: 2rem;
            display: inline-block;
            float: left;
            padding: 1rem;
        }
        &__list {
            list-style: none;
            float: right;
            &-listItem {
                display: inline-block;
                padding: 1rem;              
                margin-right: 1.5rem;
                background-color: transparent;
                transition: all .2s;
                border-radius: 5px;
                &:not(:last-child):hover {
                    background-color: #ddd;
                }
                &:not(:last-child){
                    cursor: pointer;
                }
            }
        }
        
    }
    .active {
        background-color: #fff;
    }
</style>

