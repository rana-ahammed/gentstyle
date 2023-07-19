import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category']
    },
    image: {
        type: String,
        required: [true, 'Please provide an image']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    description: {
        type: String,
        required: [true, 'Plese provide description of this product']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
