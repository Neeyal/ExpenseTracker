import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from '../utils/sendEmail.js'

export async function createUser(req, res){
    try{
    const payload = req.body
    const { username ,password ,email } = payload
    const hashedPassword = await bcrypt.hash(password, 10)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const user = new User({ username, password: hashedPassword, email, token })
    await user.save()
    sendVerificationEmail(email, token)
    res.status(200).json({ msg: 'User added successfully please check your email to verify'});
    }
    catch(err){
        res.status(300).json(err.message)
    }
}