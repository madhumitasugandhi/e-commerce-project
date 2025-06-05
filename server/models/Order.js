import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    products: [
        {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    ],
    totalBills: {
        type: Number,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    phone: {
            type: String,
            required: true,
        },
    paymentMode: {
        type: String,
        required:true,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
    },
    status: {
        type: String,
        default: "pending",
    },
    timeline: [
        {
            status:{
                type : String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
},
    {
        timestamps: true
    })

const Order = model("Order", orderSchema);

export default Order;