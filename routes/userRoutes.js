const express = require("express");
const router = express.Router();
const authenticateToken=require('../middleware/authentionHandler')
const userController= require("../controllers/userController");
router.route("/create").post(userController.createUser);
router.route("/update").post(userController.updateUser);
router.route('/getall').get(authenticateToken,userController.getAllUser);
router.route('/get').get(userController.getAllUser);
router.route('/getsingle').get(userController.getSingleUser);
router.route('/delete').post(userController.deleteSingleUser);
router.route('/login').post(userController.loginReq);
router.route('/verify').post(authenticateToken,userController.checkUser);
router.route('/createCustomer').post(authenticateToken,userController.createCustomer);
module.exports=router;