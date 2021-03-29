Vue.component('cart', {

    template: `<div class="container cart">
    <div class="cart__table">
        <div class="table__row table__header">
            <div class="row__one">Product Details</div>
            <div class="table__cell">unite Price</div>
            <div class="table__cell">Quantity</div>
            <div class="table__cell">shipping</div>
            <div class="table__cell">Subtotal</div>
            <div class="table__cell">ACTION</div>
        </div>
        <cart-item
                v-for="item of $parent.cartItems"
                :key="item.id_product"
                :cart-item="item"></cart-item>
    </div>
    <div class="cart__buttons">
        <div class="button__logon" @click.prevent="$root.$refs.dropcart.clearCart()">cLEAR SHOPPING CART</div>
        <div class="button__logon">cONTINUE sHOPPING</div>
    </div>
    <div class="cart__form">
        <div class="cart__form_left">
            <h1 class="cart__form_h1">Shipping Adress</h1>
            <select class="cart__form_select" name="" id="">
                <option selected value="Bangladesh">Bangladesh</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bangladesh">Bangladesh</option>
            </select>
            <input class="cart__form_input" type="text" placeholder="State">
            <input class="cart__form_input" type="text" placeholder="Postcode / Zip">
            <div class="button__small">get a quote</div>
        </div>
        <div class="cart__form_center">
            <h1 class="cart__form_h1">coupon discount</h1>
            <p class="cart__form_p">Enter your coupon code if you have one</p>
            <input class="cart__form_input" type="text" placeholder="State">
            <div class="button__small">Apply coupon</div>
        </div>
        <div class="cart__form_right">
            <div class="cart__checkout">
                <h1 class="cart__sub">Sub total&nbsp;&nbsp;&nbsp;&nbsp;&#36;{{ $parent.totalCart }}</h1>
                <h3 class="cart__grand">GRAND TOTAL <span class="cart__grand_pink">&nbsp;&nbsp;&nbsp;&nbsp;<span
                        class="pink">&#36;{{ $parent.totalCart }}</span></span></h3>
            </div>
            <div class="button__checkout">proceed to checkout</div>
        </div>
    </div>
</div>`,
});
Vue.component('cart-item', {
    data() {
        return {
            quantity: 0,
        }
    },
    props: ['cartItem'],
    template: `
<div class="table__row">
    <div class="row__one">
        <div class="cart__itemBox">
            <div class="cart__img">
                <img :src="'img/mini_' + cartItem.img" :alt="cartItem.product_name">
            </div>
            <div class="cart__desc">
                <h1 class="cart__title">{{ cartItem.product_name }}</h1>
                <h3 class="raiting-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></h3>
                <div class="cart__color-size">
                    <h3 class="cart__color-size-h3">Color: <span class="cart__color-size-value">Red</span></h3>
                    <h3 class="cart__color-size-h3">Size: <span class="cart__color-size-value">Xll</span></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="table__cell">
        <h3 class="cart__price">&#36;{{cartItem.price}}</h3>
    </div>
    <div class="table__cell"><input class="cart__quantity" type="text" v-model="quantity=cartItem.quantity" @change="$root.$refs.dropcart.changeQuantityHandler(quantity, cartItem)"></div>
    <div class="table__cell">
        <h3 class="cart__ship">free</h3>
    </div>
    <div class="table__cell">
        <h3 class="cart__subtotal">&#36;{{cartItem.price*cartItem.quantity}}</h3>
    </div>
    <div class="table__cell"><a class="cart__action" href="#" @click.prevent="$root.$refs.dropcart.removeItem(cartItem)"><i class="fas fa-times-circle"></i></a></div>
</div>`,
});