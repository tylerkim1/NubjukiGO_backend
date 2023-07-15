const router = require('express').Router();
const LocationModel = require('../schema/location'); 

// addLocation
router.post('/add', async (req, res) => {
    try{
        const newLocation = await LocationModel.create(req.body);

        if (!newLocation) return res.status(404).send({ err: 'Cannot Add Location' });
        else {
            return res.status(200).json(newLocation);
        }
    } catch(err){
        return res.status(530).send(err);
    }
});

module.exports = router;