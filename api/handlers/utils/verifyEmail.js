import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
export async function verifyEmail(req, res) {
    try {
      const { email } = jwt.verify(req.params.token, process.env.JWT_SECRET)
      const result = await User.updateOne({ email: email }, { $set: { is_verified: true } })
        if (result.nModified === 0) {
          return res.status(400).json({ message: 'Invalid token' })
        }
      res.status(200).json({ message: 'Email verified successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }