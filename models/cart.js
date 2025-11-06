const mangoose = require('mongoose');
const  {boolean} = require('webidl-conversions');

const cartSchema = new mangoose.Schema({    
    userid: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, required: true }
        }
    ]
}, 

{ timestamps: true }


);

 module.exports = mangoose.model('cart', cartSchema);
