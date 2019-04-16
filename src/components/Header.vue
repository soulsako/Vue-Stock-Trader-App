<template>
    <nav class='nav clearfix'>
        <router-link to='/' class='nav__logo'>Stock Trader</router-link>
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
            <li class="nav__list-listItem" @click='endDay'>End Day</li>
            <li @click='saveData' class="nav__list-listItem">Save</li>
            <li class="nav__list-listItem">Load</li>                             
            <li class="nav__list-listItem"><strong>Funds: ${{ getFunds }}.00</strong></li>          
        </ul>
    </nav>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
export default {
		data(){
			return {
				portfoliosKey: 'portfolios', 
				fundsKey: 'funds'
			}
		},
    methods: {
			...mapActions([
				'dayEnded', 
				'portFromStorage', 
				'fundsFromStorage'
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
			}, 
			saveData(){
				localStorage.setItem(this.portfoliosKey, JSON.stringify(this.getPortfolios));
				localStorage.setItem(this.fundsKey, JSON.stringify(this.getFunds));
			}
		}, 
		computed: {
			...mapGetters([
					'getPortfolios', 
					'getFunds'
				])
		}, 
		mounted(){
			const savedPortfolios = JSON.parse(localStorage.getItem(this.portfoliosKey));
			const savedFunds = JSON.parse(localStorage.getItem(this.FundsKey));
			if(savedPortfolios){
				this.portFromStorage(savedPortfolios);
				this.fundsFromStorage(Number(savedFunds));
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
            text-decoration: none;
            color: inherit;
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

