const app = new Vue({
    el: '#app',
    data: {
        cartItems: [],
        totalCart: 0,
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error));
        },
    }
})