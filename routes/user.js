const { verifyToken, verifyAndauthorization } = require('./jwttoken');

const router = require('express').Router();

router.put("/:id", verifyAndauthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CrptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_SECRET).toString();
    }

    try{
        const updatedUser = await user.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true} );
        
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
});
 
module.exports = router;