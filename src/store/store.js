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
			 getPortfolios: state => state.portfolios, 
			 getFunds: state => state.funds
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
				//If all stocks sold, remove object from array
				if(matchedObject.quantity === payload.quantity){
					state.portfolios.splice(index, 1);
				}else {
					matchedObject.value -= payload.value;
					matchedObject.quantity -= payload.quantity;
					state.portfolios[index] = matchedObject;
				}              
			}, 
			dayEndedUpdateAll: (state, payload) => {
				//Random number between 1 and 4
				const oneFour = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
				state.stocks.forEach(stock => {
					if(Math.sign(payload[oneFour]) === -1){
						const numb = payload[oneFour].toString().split('-');
						stock.price -= Number(numb[1]);
						if(stock.price <= 0){
							alert(`${stock.name} has gone bankrupt!`);
						}
					}else {
						stock.price += payload[oneFour];	
					}
				});
				// Update any stocks in portfolio
				if(state.portfolios.length === 0){
					return;
				}
				// Set portfolio price to stock price and change value accordingly
			  state.stocks.forEach(stock => {
					state.portfolios.some(portfolio => {
						if(portfolio.name === stock.name){
							portfolio.price = stock.price;
							portfolio.value = portfolio.price * portfolio.quantity;
						}
					})
				})
			 }, 
			 persistPortfolios: (state, payload) => state.portfolios = payload,
			 persistFunds: (state, payload) => state.funds = payload
    },
    actions: {
			stockBought: ({ commit }, payload) => commit('boughtStockUpdatePortfolio', payload), 
			stockSold: ({ commit }, payload) => commit('soldStockUpdatePortfolio', payload),
			dayEnded: ({ commit }, payload) => commit('dayEndedUpdateAll', payload), 
			portFromStorage: ({commit}, payload) => commit('persistPortfolios', payload),
			fundsFromStorage: ({commit}, payload) => commit('persistFunds', payload)
    }
});