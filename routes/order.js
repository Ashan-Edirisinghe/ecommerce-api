const router = require('express').Router();
const { verifyToken, verifyAndauthorization, verifyAndadmin } = require('./jwttoken');
 
const CryptoJS = require('crypto-js');
const order = require('../models/order');

//create order
 
router.post("/", verifyToken, async (req, res) => {
    const neworder = new order(req.body);
    try{
        const saveorder = await neworder.save();

        res.status(200).json(saveorder);
      }catch(err){
        res.status(500).json(err);
      }
})

//update order
router.put("/:id", verifyAndadmin, async (req, res) => {
    try{ 
   const updateorder = await order.findByIdAndUpdate(
    req.params.id,
    {
        $set: req.body
    },
    {new : true}
    
   );

   res.status(200).json(updateorder);
    }catch(err){
        res.status(500).json(error);
    }

});    

//delete order
router.delete("/:id",verifyAndadmin, async (req, res) => {
try{
    await order.findByIdAndDelete(req.params.id);
    res.status(200).json("order deleted")
}catch(err){
    console.error('Delete order error:', err);
    res.status(500).json({ error: err.message });
}
});


//get a user  order

router.get("/:userid", async (req, res) => {
  try{ 
    const findorders = await order.find({userid: req.params.userid});
    res.status(200).json(findorder);
  }catch(err){
    res.status(500).json(err);
  }
})

//get orders for admin


 router.get( "/", verifyAndadmin, async (req, res) => {
    try{
        const orders = await order.find();
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json({ err });
    }
 });

 //get income stats

    router.get("/income", verifyAndadmin, async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() -1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

        try{ 
          
            const income = await order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                { $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                }},
                { $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }}
            ]);

            res.status(200).json(income);
        }catch(err){
            
            res.status(500).json(err)
        }
    });

 
module.exports = router;