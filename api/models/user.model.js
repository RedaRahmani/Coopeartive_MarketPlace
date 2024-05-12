import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birth:{
        type: Date,
        required: false,
    },
    viewed: {
        type: Number,
        default: 0,
        required: false,
      },
      addToCart: {
        type: Number,
        default: 0,
        required: false,
      },
      shares: {
        type: Number,
        default: 0,
        required: false,
      },
    description:{
        type: String,
        required: false,
    },
    employes:{
        type: Number,
    },
    role:{
        type: String,
        enum: ['client', 'coop'],
        default: 'client',
        required: true,
    },
    cooperativeId:{
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        required:true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrIFkoONKRD6J2i9qZj4NRlKPnzJ6uUSQn6TQ3Hc5HqA&s"
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;