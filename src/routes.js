import VueRouter from 'vue-router'
import Banner from './components/Banner.vue'
import StockList from './components/StockList.vue'
import PortfolioList from './components/PortfolioList.vue'

export const router = new VueRouter({
    mode: 'history',
    routes: [
       { path: '/', component: Banner }, 
       { path:'/stocks', component: StockList }, 
       { path: '/portfolio', component: PortfolioList }, 
       { path: '/end-day', component: StockList }
    ]
})