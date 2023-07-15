const router = require('express').Router();
const MyPetModel = require('../schema/myPet');

// changeState
router.post('/changestate', async (req, res) => {
    const { myPetId, hungry, sleep, happy, clean } = req.body
    try {
        const updateMyPet = await MyPetModel.findByIdAndUpdate(myPetId, {
            hungry: hungry,
            sleep: sleep,
            happy: happy,
            clean: clean
        }, {new: true})
        if (!updateMyPet) return res.status(404).send({ err: 'My Pet Not Found'});
        else return res.status(200).json(updateMyPet);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// get
router.post('/get', async (req, res) => {
    const { myPetId } = req.body
    try {
        const updateMyPet = await MyPetModel.findById(myPetId)
        if (!updateMyPet) return res.status(404).send({ err: 'My Pet Not Found'});
        else return res.status(200).json(updateMyPet);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// myPetList
router.get('/all', async (req, res) => {
    try {
        const { userId } = req.body; // 요청에서 userId를 가져옵니다.
        const myPetList = await MyPetModel.find({ userId }); // userId와 일치하는 myPet 객체를 가져옵니다.

        if (!myPetList || myPetList.length === 0) {
            return res.status(404).send({ err: 'No Pets Found for the Provided User' });
        } else {
            return res.status(200).json(myPetList);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// addUser
router.post('/add', async (req, res) => {
    try{
        const newMyPet = await MyPetModel.create(req.body);
        if (!newMyPet) return res.status(404).send({ err: 'Cannot Add MyPet' });
        else return res.status(200).json(newMyPet);
    } catch(err){
        return res.status(530).send(err);
    }
});


module.exports = router;