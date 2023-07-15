const router = require('express').Router();
const PetModel = require('../schema/pet'); 

// addPet
router.post('/add', async (req, res) => {
    try{
        const newPet = await PetModel.create(req.body);
        if (!newPet) return res.status(404).send({ err: 'Cannot Add Pet' });
        else {
            return res.status(200).json(newPet);
        }
    } catch(err){
        return res.status(530).send(err);
    }
});

module.exports = router;