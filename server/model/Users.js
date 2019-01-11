import mongoose from 'mongoose';


const { Schema } = mongoose;
const userSchema = new Schema({
    googleId: String,
});


export default mongoose.model('users', userSchema);
