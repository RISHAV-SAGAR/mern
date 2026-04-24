import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{type: String, default: ""},
    email:{type: String, default: ""},
    password:{type: String, default: ""},
    phone:{type: Number, default: 0},
    loginTimde:{type:Number,default:0},
    token:{type: String, default: ""},
    role: { type: String, default: "user", enum: ["user", "admin"] },
    }, {timestamps: true})

    const userDataSchema = mongoose.model("user", userSchema)
    export default userDataSchema