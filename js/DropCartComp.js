Vue.component('dropcart', {
    methods: {
        addProduct(product){
            this.$parent.getJson(`./addToCart.json`)
                .then(data => {
                    if(data.result){
                        let find = this.$parent.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                            this.getTotal();
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.$parent.cartItems.push(prod);
                            this.getTotal();
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        remove(product){
            this.$parent.getJson(`./deleteFromCart.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                            this.getTotal();
                        } else {
                            this.$parent.cartItems.splice(this.$parent.cartItems.indexOf(product), 1);
                            this.getTotal();
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        removeItem(product){
            this.$parent.getJson(`./deleteFromCart.json`)
                .then(data => {
                    if(data.result){
                            this.$parent.cartItems.splice(this.$parent.cartItems.indexOf(product), 1);
                            this.getTotal();
                    } else {
                        console.log('error!')
                    }
                })
        },
        quantityValidator (quantity){
            const quantityPattern = new RegExp('^[1-9][0-9]{0,1}$');
            return quantityPattern.test(quantity);
        },
        changeQuantityHandler(quantity, cartItem){
            if (this.quantityValidator(quantity)){
                this.$parent.getJson(`./deleteFromCart.json`)
                    .then(data => {
                        if (data.result) {
                            this.$parent.cartItems.indexOf(cartItem).quantity = quantity;
                            this.getTotal();
                        } else {
                            console.log('error!')
                        }
                    })
            } else{

            }

        },
        getTotal() {
            this.$parent.totalCart = 0;
            if (this.$parent.cartItems.length) {
                for(let el of this.$parent.cartItems){
                    this.$parent.totalCart += el.quantity * el.price;
                }
            }
        },
        clearCart() {
            this.$parent.totalCart = 0;
            this.$parent.cartItems = [];
        }
    },

    mounted(){
        this.$parent.getJson(`./getCart.json`)
            .then(data => {
                this.$parent.totalCart = data.amount;
                for(let el of data.contents){
                    this.$parent.cartItems.push(el);
                }
            });
    },
    template: `
    <div class="dropcart__wrap">
        <div class="dropcart__flex">
            <div class="empty__info" v-if="!$parent.cartItems.length"><p>Cart is empty</p></div>
             
                <dropcart-item 
                    v-for="item of $parent.cartItems" 
                    :key="item.id_product"
                    :dropcart-item="item"
                    @remove="remove"></dropcart-item>
                    <div v-if="$parent.cartItems.length">
                <div class="dropcart__total" >
                <div class="dropcart__checkout">total</div>
                <div class="dropcart__checkout">&#36;{{ $parent.totalCart }}</div>
            </div>
            <div class="button__dropcart"><a href="checkout.html">Checkout</a></div>
            <div class="button__dropcart"><a href="shopping_cart.html">Go to cart</a></div>
            </div>
        </div>
    </div>`
});

Vue.component('dropcart-item', {
    props: ['dropcartItem'],
    template: `<div class="dropcart__item">
                                        <div><img :src="'img/mini_' + dropcartItem.img" :alt="dropcartItem.product_name"></div>
                                        <div class="dropcart__description">
                                            <p class="dropcart__title">{{dropcartItem.product_name}}</p>
                                            <p class="raiting-stars"><i class="fas fa-star"></i><i
                                                    class="fas fa-star"></i><i
                                                    class="fas fa-star"></i><i class="fas fa-star"></i><i
                                                    class="fas fa-star-half-alt"></i></p>
                                            <p class="dropcart__quanprice">{{dropcartItem.quantity}}&nbsp;&nbsp;&nbsp;&nbsp;<span
                                                    class="dropcart__quanprice_small">x</span>&nbsp;&nbsp;&nbsp;&nbsp;&#36;{{dropcartItem.price}}
                                            </p>
                                        </div>
                                        <div class="dropcart__action"><a class="cart__action" href="#" @click.prevent="$emit('remove', dropcartItem)"><i
                                                class="fas fa-times-circle"></i></a></div>
                                    </div>`
});
