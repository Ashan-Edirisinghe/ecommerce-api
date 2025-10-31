const router = require('express').Router();

router.get('/profile', (req, res) => {
    res.send('User profile data');
});


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Implement login logic here
    console.log(`Login attempt for user: ${username}`);
    
    // Send response back to Postman
    res.json({
        message: 'Login received',
        username: username
    });
});

module.exports = router;