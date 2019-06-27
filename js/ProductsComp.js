Vue.component('products', {
    data(){
        return {
            products: [],
        }
    },
    methods: {

    },
    mounted(){
        this.$parent.getJson(`./products.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })
    },
    template: `<div class="products f_content">
        <product 
        v-for="product of products.slice(0, 8)" 
        :key="product.id_product"
        :product="product"
        :img="product.img"></product>
    </div>`
});
Vue.component('sp-products', {
    data(){
        return {
            products: [],
        }
    },
    mounted(){
        this.$parent.getJson(`./products.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })
    },
    template: `<div class="f_content">
<product 
        v-for="product of products.slice(0, 4)" 
        :key="product.id_product"
        :product="product"
        :img="product.img"></product>
                    </div>`
});

Vue.component('all-products', {
    data(){
        return {
            products: [],
        }
    },
    mounted(){
        this.$parent.getJson(`./products.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })
    },
    template: `<div class="f_content">
<product 
        v-for="product of products.slice(0, 9)" 
        :key="product.id_product"
        :product="product"
        :img="product.img"></product>
                    </div>`
});

Vue.component('product', {
    props: ['product'],
    template: `<article class="f_list"><a href="singlepage.html"><img class="product__img" :src="'img/' + product.img" :alt="product.product_name">
                            <p class="title">{{product.product_name}}</p>
                            <p class="price">&#36;{{product.price}}</p>
                        </a>
                    <a href="#" class="product__add" @click.prevent="$root.$refs.dropcart.addProduct(product)"><img src="img/cartw.svg" alt="cart">Add to Cart</a>
                </article>`
});