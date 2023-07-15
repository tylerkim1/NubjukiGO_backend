const mongoose = require("mongoose");

const LocationSchemaDefinition = {
    longitude: { 
        type: String,
        required: true,
        unique: false
    },
	latitude: {
        type: String,
        required: true,
        unique: false
    },
    location: {
        type: String,
        required: true,
        unique: false
    }
    
};
const LocationSchemaOptions = { timestamps: true };

const Locationschema = new mongoose.Schema(LocationSchemaDefinition, LocationSchemaOptions);

const LocationModel = mongoose.model("location", Locationschema);

module.exports = LocationModel;
