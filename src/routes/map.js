const router = require('express').Router();
const UserModel = require('../schema/user');
const PetModel = require('../schema/pet');
const WildPetModel = require('../schema/wildPet');
const MyPetModel = require('../schema/myPet');
const LocationModel = require('../schema/location');

// allPet
router.post('/all', async (req, res) => {
    try {
        const allPets = await WildPetModel.find()
        if (!allPets || allPets.length === 0) {
            return res.status(400).send({ err: 'No Pets Found' });
        } else {
            let result = [];
            for (let i = 0; i < allPets.length; i++) {
                const location = await LocationModel.findById(allPets[i].locationId)
                const pet = await PetModel.findById(allPets[i].petId)
                result.push({
                    longitude: location.longitude,
                    latitude: location.latitude,
                    location: location.location,
                    name: pet.name,
                    rank: pet.rank,
                    petLocation: pet.location,
                    probability: pet.probability
                });
            }
            return res.status(200).json({ list: result});
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});


// catchPet
router.post('/catch', async (req, res) => {
    try {
        const { userId, wildPet } = req.body; 
        const pet = await PetModel.findById(wildPet.petId);
        // console.log("pet =", pet)

        const deleteWildPet = await WildPetModel.findByIdAndDelete(wildPet._id); // DB에서 해당 wildPet을 지움, 먼저 지워주어야 2번 생길 일 방지.

        if (!deleteWildPet) return res.status(400).json({ error: 'Wild Pet Not Found' });

        const myPet = await MyPetModel.create({ userId: userId, petId: pet.id, locationId: wildPet.locationId, hungry: 70, sleep: 70, happy: 70, clean: 70 });

        if (!newPet) return res.status(400).send({ err: 'Cannot Add My Pet' });
        else {
            res.status(200).json(myPet); // 성공 시 myPet 객체 반환
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { myPetId } = req.body;
        if (!myPetId) return res.status(400).json({ error: 'Missing myPetId' });
    
        const deletedMyPet = await MyPetModel.findByIdAndDelete(myPetId);
        if (!deletedMyPet) return res.status(400).json({ error: 'myPet Not Found' });
        return res.status(200).json({ message: 'myPet deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// showInfo
router.post('/show', async (req, res) => {
    try {
        const newWildPet = req.body;
        const newPet= await PetModel.findById(newWildPet.petId);
        const newLocation = await LocationModel.findById(newWildPet.locationId);
        if ((!newPet) || (!newLocation)) return res.status(400).send({ err: 'Pet Not Found' });
        else return res.status(200).json({pet: newPet, location: newLocation});
    } catch (err) {
        return res.status(500).send(err);
    }
});

// add wildpet
router.post('/add', async (req, res) => {
    try{
        const newWildPet = await WildPetModel.create(req.body);
        if (!newWildPet) return res.status(400).send({ err: 'Cannot Add Wild Pet' });
        else return res.status(200).json(newWildPet);
    } catch(err){
        return res.status(530).send(err);
    }
});

module.exports = router;
