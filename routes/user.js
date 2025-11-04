const { verifyToken, verifyAndauthorization, verifyAndadmin } = require('./jwttoken');

const router = require('express').Router();

//update

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

 //delete

router.delete("/:id",verifyAndauthorization, async (req, res) => {
try{
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted")
}catch(err){
    res.status(500).json(err);
}
});
module.exports = router;

//get

router.get("/:id", verifyAndadmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});