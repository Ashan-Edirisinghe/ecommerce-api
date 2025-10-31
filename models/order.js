const mangoose = require('mongoose');
const  {boolean} = require('webidl-conversions');

const orderSchema = new mangoose.Schema({    
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
}, 

{ timestamps: true }


);

 module.exports = mangoose.model('order', orderSchema);
