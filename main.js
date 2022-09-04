const app = Vue.createApp({
    data(){
        return{
            cart: [],
            premium: true,
            v_bind: 'https://www.vuemastery.com/courses/intro-to-vue-3/attribute-binding-vue3/',
            v_conditional_rendering: 'https://www.vuemastery.com/courses/intro-to-vue-3/conditional-rendering-vue3',
        }
    },
    methods: {
        addToCart(id){
            this.cart.push(id)
        },
        removeToCart(id) {
            const index = this.cart.indexOf(id)
                if (index > -1) {
                    this.cart.splice(index, 1)
                }
        }
    },
  
})