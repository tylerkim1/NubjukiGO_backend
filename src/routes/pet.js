const router = require('express').Router();
const PetModel = require('../schema/pet'); 

// addPet
router.post('/add', async (req, res) => {
    try{
        const newPet = await PetModel.create(req.body);
        if (!newPet) return res.status(400).send({ err: 'Cannot Add Pet' });
        else {
            return res.status(200).json(newPet);
        }
    } catch(err){
        return res.status(530).send(err);
    }
});

// getPetInfo
router.post('/get', async (req, res) => {
    const { petId } = req.body
    try {
        const pet = await PetModel.findById(petId)
        if (!pet) return res.status(400).send({ err: 'Pet Not Found'});
        else return res.status(200).json(pet);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;