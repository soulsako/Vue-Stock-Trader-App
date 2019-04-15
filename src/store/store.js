import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({

    state: {
        stocks: [
            { name: 'BMW', price: 110 }, 
            { name: 'Google', price: 200 }, 
            { name: 'Apple', price: 250 }, 
            { name: 'Twitter', price: 8 }
        ], 
        portfolios: [], 
        funds: 10000
    },
    getters: {
       getCompanies: state => state.stocks, 
       getPortfolios: state => state.portfolios
    },
    mutations: {

        updatePortfolio: (state, payload) => {
            state.funds = state.funds - payload.value;
            
            const index = state.portfolios.findIndex(portfolio => {
                portfolio.name === payload.name;
            });
            if(index === -1){
                return state.portfolios.push(payload);
            }
            const copyState = [...state.portfolios];
            const matchedPortfolio = copyState[index];
            matchedPortfolio.quantity += payload.quantity;
            matchedPortfolio.value += payload.value;

            copyState[index] = matchedPortfolio;
            return state = copyState;
                      
        }
    },
    actions: {
        stockBought: ({ commit }, payload) => commit('updatePortfolio', payload)
    }
});