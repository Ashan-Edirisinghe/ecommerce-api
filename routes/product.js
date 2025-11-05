const router = require('express').Router();
const { verifyToken, verifyAndauthorization, verifyAndadmin } = require('./jwttoken');
 
const CryptoJS = require('crypto-js');
const product = require('../models/product');

//create product

router.post("/", verifyToken, async (req, res) => {
    const newcart = new cart(req.body);
    try{
        const savecart = await newcart.save();

        res.status(200).json(savecart);
      }catch(err){
        res.status(500).json(err);
      }
})


//delete product


router.delete("/:id",verifyAndadmin, async (req, res) => {
try{
    await product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted")
}catch(err){
    console.error('Delete product error:', err);
    res.status(500).json({ error: err.message });
}
});

//update

router.put("/:id", verifyAndauthorization, async (req, res) => {
    try{ 
   const updateproduct = await product.findByIdAndUpdate(
    req.params.id,
    {
        $set: req.body
    },
    {new : true}
    
   );

   res.status(200).json(updateproduct);
    }catch(err){
        res.status(500).json(error);
    }

});    

//get a product

router.get("/:id", async (req, res) => {
  try{ 
    const findproduct = await product.findById(req.params.id);
    res.status(200).json(findproduct);
  }catch(err){
    res.status(500).json(err);
  }
})


//get all products

router.get( "/",   async (req, res) => {
    const query1 = req.query.new;
    const query2 = req.query.category;
    try {
        let products;
        if(query1){
        products = query1 ? await product.find().sort({ _id: -1 }).limit(5) : await product.find();
        }else if(query2){
           products = await product.find(
            {
                categories:{$in:query2},

            }
           ) 
        }else{
            products =await product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        console.error('Get all products error:', err);
        res.status(500).json({ error: err.message });
    }
});




 
module.exports = router;