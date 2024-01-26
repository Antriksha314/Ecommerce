import mongoose from 'mongoose';
import { GenerateHashPassword } from '../../../Helper/Bcrypt.js';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    const password = this.password;
    
    const hashPassword = await GenerateHashPassword(password)

    this.password = hashPassword;

    next();

})

const Users =  mongoose.model('Users', UserSchema);
export default Users;