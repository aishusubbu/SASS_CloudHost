const {userModel, findByEmail} = require('../model/user');
const {accountModel, findAccountByOwnerId, findById} = require('../model/account');
const transactionModel = require('../model/transaction');
const bcrypt = require('bcrypt');




const authenticateUser = async (email, password) => {
    try{
      const user = await findByEmail(email);
      console.log(user);
      if(!user){
        return {error: 'User not found, Please enter valid email'};
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if(!passwordValid){
        return {error: 'User not found, Please enter valid password'};
      }
      return user;
    } catch (error) {
      console.error('Error during login:', error);
      return { error: 'Internal server error' };
    }
}

const registerUser = async (firstName, lastName, email, password) => {
  try{
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return { error: 'Email is already registered' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create an account for the new user
    const newAccount = new accountModel({
      accountNumber: generateAccountNumber(), // You need to implement a function to generate account numbers
      balance: 100, // Initial balance
      owner: newUser._id, // Link the account to the new 
      active: false,
    });

    // Save the account to the database
    await newAccount.save();

    // Update the user's accounts array with the new account
    newUser.accounts.push(newAccount._id);
    await newUser.save();
    //return(newUser);
    return { message: 'User registered successfully' };
  } catch (error) {
    console.error('Error during user registration:', error);
    return { error: 'Internal server error' };
  }
};

// Function to generate a random account number (you should implement your logic here)
function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

const getUserData = async (email) => {
  try{
    const user = await findByEmail(email);
    console.log(user);
    if(!user){
      return {error: 'User not found, Please enter valid email'};
    }
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { error: 'Internal server error' };
  }
}

const getAccountData = async (owner) => {
  try{
    const account = await findAccountByOwnerId(owner);
    console.log(account);
    if(!account){
      return {error: 'Account not found, Please enter valid account number'};
    }
    return account;
  } catch (error) {
    console.error('Error fetching account data:', error);
    return { error: 'Internal server error' };
  }
}

const transferMoneyService = async (sourceAccountId, destinationAccountId, transferAmount) => {
  try {
    const sourceAccount = await findById(sourceAccountId);
    const destinationAccount = await findById(destinationAccountId);

    if (!sourceAccount || !destinationAccount) {
      return { error: 'One or both accounts not found' };
    }

    if (sourceAccount.balance < transferAmount) {
      return { error: 'Insufficient funds in source account' };
    }

    console.log(Date.now());

    const newTransaction = new transactionModel({
      amount: transferAmount,
      type: "transfer",
      sourceAccount: sourceAccount._id,
      destinationAccount: destinationAccount._id,
      timestamp: Date.now(),
    });

    await newTransaction.save();

    sourceAccount.transactions.push(newTransaction._id);
    destinationAccount.transactions.push(newTransaction._id);

    sourceAccount.balance -= transferAmount;
    destinationAccount.balance += transferAmount;

    await sourceAccount.save();
    await destinationAccount.save();

    return { message: 'Transfer successful' };
  } catch (error) {
    console.error('Error in transferMoneyService:', error);
    return { error: 'Internal server error' };
  }
};
const updateUserPassword = async (email, newPassword) => {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const result = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (result) {
      return { message: 'Password updated successfully' };
    } else {
      return { error: 'User not found' };
    }
  } catch (error) {
    console.error('Error updating user password:', error);
    return { error: 'Internal server error' };
  }
};

// In service.js


const getAllUsers = async () => {
  try {
    // Retrieves all users where __v equals 1
    return await userModel.find({ acctype: True });
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error; // Rethrow the error to be caught by the controller
  }
};





module.exports = { authenticateUser, registerUser, getUserData, getAccountData, transferMoneyService , getAllUsers,updateUserPassword};

