import { model, Schema } from 'mongoose';

const PaymentSchema = new Schema({
    paymentMode:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    timeline:[
        {
            status: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ]
},
    {
        timestamps: true,
    });

const Payment = model('Payment', PaymentSchema);

export default Payment;