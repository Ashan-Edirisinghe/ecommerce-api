const { verifyToken, verifyAndauthorization, verifyAndadmin } = require('./jwttoken');
const User = require('../models/user');
const CryptoJS = require('crypto-js');

const router = require('express').Router();

//update

router.put("/:id", verifyAndauthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_SECRET).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true} );

        res.status(200).json(updatedUser);
    }
    catch(err){
        console.error('Update user error:', err);
        res.status(500).json({ error: err.message });
    }
});    

 //delete

router.delete("/:id",verifyAndauthorization, async (req, res) => {
try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted")
}catch(err){
    console.error('Delete user error:', err);
    res.status(500).json({ error: err.message });
}
});






//get user

router.get("/find/:id", verifyAndadmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        console.error('Get user error:', err);
        res.status(500).json({ error: err.message });
    }
});


//get all users

router.get( "/", verifyAndadmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Get all users error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

 
 