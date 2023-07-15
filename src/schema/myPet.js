const mongoose = require("mongoose");

const MypetSchemaDefinition = {
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false
    },
	petId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    hungry: {
        type: Number,
        required: true,
        unique: false,
        default: 70
    },
    sleep: {
        type: Number,
        required: true,
        unique: false,
        default: 70
    },
    happy: {
        type: Number,
        required: true,
        unique: false,
        default: 70
    },
    clean: {
        type: Number,
        required: true,
        unique: false,
        default: 70
    }
    
};

const MypetSchemaOptions = { timestamps: true };
const Mypetschema = new mongoose.Schema(MypetSchemaDefinition, MypetSchemaOptions);
const MypetModel = mongoose.model("mypet", Mypetschema);

module.exports = MypetModel;
