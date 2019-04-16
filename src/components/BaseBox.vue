<template>
    <div class="box" :style='{display: company.displayNone}'>
        <div class="box__top" :style='{backgroundColor: boxColor}'>
            <span class='box__top-name'>{{ company.name }}</span>
            <span class='box__top-price'>(Price: {{company.price}})</span>
            <span v-if='company.quantity' class='box__top-quantity'>Stocks: {{company.quantity}}</span>
            <span v-if='company.value' class='box__top-value'>worth: ${{company.value}}</span>
        </div>
        <div class="box__bottom">
            <input type="number" min='1' v-model='quantity' placeholder='Quantity'>
            <button :class='btnColor' @click='transaction'>{{ btnText }}</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    props: {
        company: {
            type: Object, 
            default: () => {}, 
            required: true
        }, 
        btnColor: {
            type: String
        },
        btnText: {
            type: String, 
            required: true
        }, 
        boxColor: {
            type: String, 
            required: true
        }
    }, 
    data(){
        return {
            quantity: null
        }
    }, 
    methods: {
        ...mapActions([
            'stockBought',
            'stockSold'
        ]), 
        transaction(){
           this.btnText == 'buy' ? this.bought() : this.sold();
        }, 
        bought(){
            const funds = this.$store.state.funds,
            value = this.quantity * Number(this.company.price), 
            quantity = Number(this.quantity);
            
            if(quantity === 0 || isNaN(quantity)){
                return alert('Please enter a quantity');
            }
            // Quantity reset to nothing to clear input field DO NOT USE THIS.QUANTITY TO ACCESS INPUT BEYOND THIS LINE
            this.quantity = '';
            if(value > funds){
                return alert('Insuffcient funds for transaction. Please try a lower quantity');
            }

            this.stockBought({ ...this.company, value, quantity });
        }, 
        sold(){
            const funds = this.$store.state.funds,
            value = this.quantity * Number(this.company.price), 
            quantity = Number(this.quantity);
           
            if(quantity === 0 || isNaN(quantity)){
                return alert('Please enter a quantity');
            }
            this.quantity = '';
            if(value > this.company.value){
                return alert('Insuffcient stocks for transaction. Please try a lower quantity');
            }
            this.stockSold({ ...this.company, value, quantity });
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../mixins/mixins';
    .box {
        border: 1px solid #ddd;
        border-radius: 5px;

        > * {
            padding: 1rem 2rem;
        }
        &__top {
            color: #fff;
           
            &-name {
                font-size: 2rem;
                margin-right: 1rem;
                display: inline-block;
            }
            &-price, &-quantity, &-value {
                font-size: 1.5rem;
            }
            &-quantity {
                margin-left: 1.5rem;
            }
            &-value {
                margin-left: 1.5rem;
            }

        }
        &__bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    input {
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #eee;
        &::-webkit-input-placeholder {
            font-family: 'Open Sans', sans-serif;
            font-size: 1.5rem;
            color: #999;
        }
    }
    .btn-green {
        
        @include btn;
        background-color: darken(lightgreen, 15%);
        
        &:hover {
           background-color: lightgreen; 
        }
    }
    .btn-red {
        
        @include btn;
        background-color: darken(red, 15%);
        
        &:hover {
           background-color: lightsalmon; 
        }
    }
</style>
