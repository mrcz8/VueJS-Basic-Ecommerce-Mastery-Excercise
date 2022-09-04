app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
        <div class="product-image">
            <img :class="{'out-of-stock-img': !inventory}" :src="image">
        </div>
        <div class="product-info">

            <h1>{{title}}</h1>
            <p v-if="onSale">{{ saleMessage }}</p>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out</p>
            <p v-else>Sold Out</p>
            
            <p>Shipping Fee: {{shipping}}</p>
            <p v-show="onSale">On Sale</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <ul>
                <li v-for="(size, index) in sizes" :key="index">{{size}}</li>
            </ul>
            <div
                v-for="(variant, index) in variants"
                :key="variant.id"
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{ backgroundColor: variant.color}">
            </div>

            <button class="button" @click="addToCart" :disabled="!inventory" :class="{ disabledButton: !inventory}">Add to Cart</button>
            <button class="button" @click="removeToCart" :disabled="!inventory" :class="{ disabledButton: !inventory}">Remove Item</button>
        </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,

  data(){
    return{
        product: 'Socks',
        brand: 'Vue',
        selectedVariant: 0,
        onSale: false,
        details: ['50% cotton', '30% wool', '20% polyester'],
        sizes: ['S', 'M', 'L'],
        variants: [
            { id:1, color:'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id:2, color:'blue', image: './assets/images/socks_blue.jpg', quantity: 0},
        ],
        reviews: []
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeToCart() {
        this.$emit('remove-to-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index){
        this.selectedVariant = index
    },
    addReview(review){
        this.reviews.push(review)
    }
},
computed: {
    title() {
        return this.product +' '+ this.brand
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    inventory() {
        return this.variants[this.selectedVariant].quantity
    },
    saleMessage() {
        if(this.onSale){
            return this.brand + ' ' +this.product + ' is on sale.'
        }
    },
    shipping(){
        if(this.premium){
            return 'Free'
        }
        return 5.00
    }

}
})