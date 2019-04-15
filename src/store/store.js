import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
// Prefer initializing your store's initial state with all desired fields upfront.
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

        boughtStockUpdatePortfolio: (state, payload) => {

            state.funds = state.funds - payload.value;
            const index = state.portfolios.findIndex(portfolio => portfolio.name === payload.name);
           
            if(index === -1){
                return state.portfolios.push(payload)
            }
            //When adding new properties to an Object, replace that Object with a fresh one.
            const matchedObject = {...state.portfolios[index]};
            matchedObject.value += payload.value;
            matchedObject.quantity += payload.quantity;
            
            state.portfolios[index] = matchedObject;

        }, 
        soldStockUpdatePortfolio: (state, payload) => {

            state.funds = state.funds + payload.value;
            const index = state.portfolios.findIndex(portfolio => portfolio.name === payload.name);
        
            //Here, however since we are not changing routes clicking the sell button the vue does not re-render the portfolio array. 
            //Therefore we have to mutate the state directly

            const matchedObject = state.portfolios[index];
            matchedObject.value -= payload.value;
            matchedObject.quantity -= payload.quantity;
            state.portfolios[index] = matchedObject;   
        }
    },
    actions: {
        stockBought: ({ commit }, payload) => commit('boughtStockUpdatePortfolio', payload), 
        stockSold: ({ commit }, payload) => commit('soldStockUpdatePortfolio', payload)
    }
});