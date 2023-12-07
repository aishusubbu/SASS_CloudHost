const express = require('express');
const {loginController, 
  registerController,
   getUserDataController, 
   getAccountDataController,
  transferController} = require('../controller/controller');
  const { getAllUsersController } = require('../controller/controller');

const router = express.Router();

router.post('/Login', loginController);
router.post('/Register', registerController);
router.get('/getUserData', getUserDataController);
router.get('/getAccountData', getAccountDataController);
router.post('/transfer', transferController);
router.get('/getAllUsers', getAllUsersController);

module.exports = router;