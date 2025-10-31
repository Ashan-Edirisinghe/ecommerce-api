const mangoose = require('mongoose');
const  {boolean} = require('webidl-conversions');

const userSchema = new mangoose.Schema({    
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
}, 

{ timestamps: true }


);

 module.exports = mangoose.model('User', userSchema);

 
