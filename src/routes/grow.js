const router = require('express').Router();
const MyPetModel = require('../schema/myPet');
const PetModel = require('../schema/pet'); 

const getValidState = (value) => {
    if (value < 0) return 0;
    else if (value > 100) return 100;
    else return value;
}

// changeState
router.post('/changestate', async (req, res) => {
    const { myPetId, hungry, sleep, happy, clean } = req.body
    try {
        const updateMyPet = await MyPetModel.findByIdAndUpdate(myPetId, {
            hungry: getValidState(hungry),
            sleep: getValidState(sleep),
            happy: getValidState(happy),
            clean: getValidState(clean)
        }, {new: true})
        console.log(updateMyPet);
        if (!updateMyPet) return res.status(400).send({ err: 'My Pet Not Found'});
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
        if (!updateMyPet) return res.status(400).send({ err: 'My Pet Not Found'});
        else return res.status(200).json(updateMyPet);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// myPetList
router.post('/all', async (req, res) => {
    try {
        const { userId } = req.body; // 요청에서 userId를 가져옵니다.
        const myPetList = await MyPetModel.find({ userId }); // userId와 일치하는 myPet 객체를 가져옵니다.
        
        for (let i = 0; i < myPetList.length; i++) {
            const { id, petId, updatedAt, hungry, clean, happy, sleep } = myPetList[i];
            const diff = new Date().getTime() - new Date(updatedAt).getTime();
            const time = Math.floor(((diff / 1000) / 60)); // minute
            console.log("time(minute) : ", time);
        
            try {
                const pet = await PetModel.findById(petId)
                let item = myPetList[i];
                if (time != 0) {
                    item = await MyPetModel.findByIdAndUpdate(id, {
                        hungry: getValidState(hungry - time * 5),
                        sleep: getValidState(sleep - time * 5),
                        clean: getValidState(clean - time * 5),
                        happy: getValidState(happy - time * 5)
                    }, { new: true})
                }
               
                if (!pet) return res.status(400).send({ err: 'My Pet Not Found'});
                else {
                    let myPet = item.toObject(); // 변환
                    myPet.name = pet.name
                    myPet.rank = pet.rank
                    myPetList[i] = myPet; // 수정된 객체로 교체
                }
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        }
        console.log(myPetList);
        if (!myPetList) {
            return res.status(400).send({ err: 'No Pets Found for the Provided User' });
        } else {
            return res.status(200).json({ list: myPetList });
        }
    } catch (err) {
        console.log("err: ", err);
        return res.status(500).send(err);
    }
});

// addMyPet
router.post('/add', async (req, res) => {
    try{
        const newMyPet = await MyPetModel.create(req.body);
        if (!newMyPet) return res.status(400).send({ err: 'Cannot Add MyPet' });
        else return res.status(200).json(newMyPet);
    } catch(err){
        return res.status(530).send(err);
    }
});


module.exports = router;