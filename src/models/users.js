import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: [true, 'this field is required'] },
    lastName: { type: String, required: [true, 'this field is required'] },
    email: { type: String, required:[true, 'this field is required'], unique: true , match: /.+\@.+\..+/ },
    password: { type: String , required:[true, 'this field is required']},
    date: { type: Date, default: Date.now }
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password)
}
module.exports = mongoose.model('user', userSchema)