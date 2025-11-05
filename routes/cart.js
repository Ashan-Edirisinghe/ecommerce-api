const router = require('express').Router();
const { verifyToken, verifyAndauthorization, verifyAndadmin } = require('./jwttoken');
const cart = require('../models/cart');
const CryptoJS = require('crypto-js');
 

//create  cart

router.post("/", verifyToken, async (req, res) => {
    const newcart = new cart(req.body);
    try{
        const savecart = await newcart.save();

        res.status(200).json(savecart);
      }catch(err){
        res.status(500).json(err);
      }
})

//update cart

router.put("/:id", verifyAndauthorization, async (req, res) => {
    try{ 
   const updatecart = await cart.findByIdAndUpdate(
    req.params.id,
    {
        $set: req.body
    },
    {new : true}
    
   );

   res.status(200).json(updatecart);
    }catch(err){
        res.status(500).json(error);
    }

});    

//delete cart

router.delete("/:id",verifyToken, async (req, res) => {
try{
    await cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart deleted")
}catch(err){
    console.error('Delete product error:', err);
    res.status(500).json({ error: err.message });
}
});


 //get user cart

 
 router.get("/:userid", async (req, res) => {
   try{ 
     const findcart = await cart.findOne({ userId: req.params.userid });
     res.status(200).json(findcart);
   }catch(err){
     res.status(500).json(err);
   }
 })
 
 //get all carts for admins

 router.get( "/", verifyAndadmin, async (req, res) => {
    try{
        const carts = await cart.find();
        res.status(200).json(carts);
    } catch(err){
        res.status(500).json({ err });
    }
 });
  
module.exports = router;