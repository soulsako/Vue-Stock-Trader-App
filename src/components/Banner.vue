<template>
    <div class="banner">
        <div class="banner__top">
            <h1 class="banner__top-heading">Trade or View your Portfolio.</h1>
            <p class="banner__top-text">You may save and load your data.</p>
            <p class="banner__top-text">Click on 'end day' to start a new day.</p>
        </div>
        <div class="banner__bottom">
            <h3 class="banner__bottom-funds">Your Funds: ${{ this.$store.state.funds }}.00</h3>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang='scss' scoped>
    .banner {
        margin-top: 3rem;
        padding: 3rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        &__top {
            border-bottom: 1px solid #eee;
            &-heading {
                margin-bottom: 3rem;
                font-size: 4rem;
            }
            &-text {
                font-size: 1.7rem;
                &:not(:first-of-type){
                    padding: 1.5rem 0;
                }
            }
        }
        &__bottom {
            padding: 2rem 2rem 0 0;
            font-weight: 700;
            font-size: 1.7rem;
        }
    }
</style>
