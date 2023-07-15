const router = require('express').Router();
const UserModel = require('../schema/user'); 

// login
router.post('/login', async (req, res) => {
    try{
        const { name, email } = req.body
        const foundUser = await UserModel.findOne({ email: email });
        if (!foundUser) {
            const newUser = await UserModel.create({name: name, email: email});
            if (!newUser) return res.status(404).send({ err: 'Cannot Add User' });
            else return res.status(200).json(newUser);
        } else return res.status(200).json(foundUser);
    } catch(err){
        return res.status(530).send(err);
    }
});

module.exports = router;