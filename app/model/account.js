const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: false},
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  acctype: { type: Boolean, required: true, default: 1},
});

const accountModel = mongoose.model('BankAccount', accountSchema);

const findAccountByOwnerId = async (owner) => {
  try {
    return await accountModel.findOne({ owner });
  } catch (error) {
    console.log('Error in findByownerId:', error.message);
  }
};


const findById = async (accountNumber) => {
  try {
    return await accountModel.findOne({ accountNumber });
  } catch (error) {
    console.log('Error in findByAccountNumber:', error.message);
  }
};

module.exports = {accountModel, findAccountByOwnerId, findById};