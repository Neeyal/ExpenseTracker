import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Account schema
const AccountSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    auto: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    required: true,
    min: [0, 'Balance cannot be negative']
  },
  created_at: {
    type: Date,
    default: Date.now,
    auto: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    auto: true
  }
},
{
  collection: 'Account' // specify the existing collection name here
});

// Pre-save hook to update the timestamp
AccountSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
  });

// Create and export the Account model
const Account = mongoose.model('Account', AccountSchema);
export default Account;
