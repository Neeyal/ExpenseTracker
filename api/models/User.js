import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    auto: true
  },  
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  isActive:{
    type: Boolean,
    default: false
  },
  token:{
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    auto: true
  }
},
{
  collection: 'User' // specify the existing collection name here
});  
  
const User = mongoose.model('User', userSchema)

export default User
  