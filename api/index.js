import express from 'express'
import dotenv from 'dotenv'
import { createUser } from './handlers/user/post.js'
import { listUsers } from './handlers/user/list.js'
import { getUser } from './handlers/user/get.js'
import { updateUser } from './handlers/user/patch.js'
import { deleteUser } from './handlers/user/delete.js'
import { createAccount } from './handlers/account/post.js'
import { verifyEmail } from './handlers/utils/verifyEmail.js'
import { loginUser } from './handlers/user/login.js'
import { authMiddleware } from './handlers/utils/authorize.js'
// import { logoutUser } from './handlers/user/logout.js'

import cors  from 'cors'
import mongoose from 'mongoose'

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"]
}))
  
const uri = 'mongodb://localhost:27017/Expense-Tracker'
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err))

// public routes  
app.post('/create-user', createUser)

// private routes
// app.use(authMiddleware)
app.get('/users', listUsers)
app.delete('/user/:id', deleteUser)
app.get('/verify/:token', verifyEmail)
app.post('/login', loginUser)
// app.post('/logout', logoutUser)
app.get('/user/:id', getUser)
app.patch('/user/:id', updateUser)
app.post('/create-account', createAccount)



app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});