const express = require("express");
const router = express.Router();
const userController= require("../controllers/userController");
router.route("/create").post(userController.createUser);
router.route("/update").post(userController.updateUser);
router.route('/getall').get(userController.getAllUser);
router.route('/getsingle').get(userController.getSingleUser);
router.route('/delete').post(userController.deleteSingleUser);
module.exports=router;