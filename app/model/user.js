const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  acctype: { type: Boolean, required: true, default: 1},
});

const userModel = mongoose.model('BankUser', userSchema);

const findByEmail = async (email) => {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    console.log('Error in findByEmail:', error.message);
  }

};

module.exports = {userModel, findByEmail};