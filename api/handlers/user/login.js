import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import bcrypt from 'bcryptjs'

export async function loginUser(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    if (!user.is_verified) {
      return res.status(401).json({ message: 'Please verify your email' })
    }
    const token = await validateToken(user) 
    user.token = token
    user.isActive = true 
    res.status(200).json({ user })
  } catch (error) {
    console.error(error) 
    res.status(500).json({ message: 'Server error' })
  }
}

async function validateToken(user) {
  try {
    if (!user.token) {
      throw new Error('Token not provided')
    }
    const decoded = jwt.verify(user.token, process.env.JWT_SECRET)
    if (decoded.email !== user.email) {
      throw new Error('Token does not match the given email')
    }
    await User.updateOne(
      { email: user.email }, 
      { $set: { isActive: true } }, 
      { new: true } 
    )
    return user.token
  } catch (error) {
    const payload = { email: user.email } // Correctly structure the payload
    const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    await User.updateOne(
      { email: user.email }, 
      { $set: { token: newToken, isActive: true } }, 
      { new: true } 
    )
    return newToken
  }
}
