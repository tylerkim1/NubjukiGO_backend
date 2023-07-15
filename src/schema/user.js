const mongoose = require("mongoose");

const UserSchemaDefinition = {
    name: { 
        type: String,
        required: true,
        unique: true
    },
	email: {
        type: String,
        required: true,
        unique: true
    }
    
};
const UserSchemaOptions = { timestamps: true };

const Userschema = new mongoose.Schema(UserSchemaDefinition, UserSchemaOptions);

const UserModel = mongoose.model("user", Userschema);

module.exports = UserModel;