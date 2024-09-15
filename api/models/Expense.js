import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Expense schema
const ExpenseSchema = new Schema({
  expenseId: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
  category: {
    type: String,
    required: true,
    enum: ['Travel', 'Supplies', 'Entertainment', 'Food', 'Other'] // Example categories
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the timestamp
ExpenseSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});
  
// Create and export the Expense model
const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;