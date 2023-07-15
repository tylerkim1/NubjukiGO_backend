const mongoose = require("mongoose");

const WildpetSchemaDefinition = {
    locationId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
    },
	petId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false
    }
};

const WildpetSchemaOptions = { timestamps: true };
const Wildschema = new mongoose.Schema(WildpetSchemaDefinition, WildpetSchemaOptions);
const WildModel = mongoose.model("wildPet", Wildschema);

module.exports = WildModel;
