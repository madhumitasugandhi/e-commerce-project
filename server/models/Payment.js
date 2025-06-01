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
},
    {
        timestamps: true,
    });

const Payment = model('Payment', userSchema);

export default Payment;