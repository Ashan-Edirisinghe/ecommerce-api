const mangoose = require('mongoose');
const  {boolean} = require('webidl-conversions');

const productSchema = new mangoose.Schema({    
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: Array, required: true },
    size: { type: String, required: true },
    color: { type: Array, required: true },
    
}
, 

{ timestamps: true }


);

 module.exports = mangoose.model('product', productSchema);
