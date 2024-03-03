const mongoose = require('mongoose');


const walletHistorySchema = new mongoose.Schema({
  wallet_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wallet',
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // You can add more fields such as transaction date, description, etc. as per your requirements
}, {
  timestamps: true, // This adds createdAt and updatedAt fields
});

const WalletHistory = mongoose.model('WalletHistory', walletHistorySchema);

const walletSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required: true,
  },
 
    amount: {
      type: Number,
      required: true,
      default:0
    }

},
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }

);

module.exports = {
  Wallet:mongoose.model('Wallet', walletSchema),
  WalletHistory:WalletHistory
}