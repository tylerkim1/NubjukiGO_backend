const mongoose = require("mongoose");

const PetSchemaDefinition = {
    name: { 
        type: String,
        required: true,
        unique: true
    },
	rank: {
        type: Number,
        required: true,
        unique: false
    },
    habitat: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        unique: false
    },
    probability: {
        type: [Number],
        required: true,
        unique: false
    }
    
};
const PetSchemaOptions = { timestamps: true };

const Petschema = new mongoose.Schema(PetSchemaDefinition, PetSchemaOptions);

const PetModel = mongoose.model("pet", Petschema);

module.exports = PetModel;
