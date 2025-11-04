const router = require('express').Router();
const User = require('../models/user');
const CrptoJS = require('crypto-js');

 router.post('/register',  async (req, res) => {
     // Registration logic here

     const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: CrptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_SECRET).toString(),
     });

    try{ 
     const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
         
         res.status(500).json({ err });
     }

 });

 // Login
    router.post('/login', async (req, res) => { 
        try {
            const user = await User.findOne({ username: req.body.username });

          const  hashpassword = CrptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SECRET);
          const password = hashpassword.toString(CrptoJS.enc.Utf8);
            if(password !== req.body.password){ 
                res.status(401).json({ message: 'Invalid credentials' });
            }else{
                res.status(200).json({ message: 'Login successful' });
            }

           
        } catch(err){
            res.status(500).json({ err });
        }
    });
module.exports = router;