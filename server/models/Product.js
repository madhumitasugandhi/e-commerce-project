import { model, Schema } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    shortDescription: {
        type: String,
        require: true,
    },
    longDescription: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    currentPrice: {
        type: Number,
    },
    category: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
    },
},
    {
        timestamps: true
    })

const Product = model("Product", productSchema);

export default Product;