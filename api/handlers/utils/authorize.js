import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

export async function authMiddleware (req, res, next)  {
  const token = req.header('Authorization').replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error('User not found')
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
