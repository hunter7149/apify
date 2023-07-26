const express = require("express");
const router = express.Router();
const {getContacts,getContact,createContact,updateContact,deleteContact}=require("../controllers/contactController");
router.route('/test').get(getContacts).post(createContact);;

router.route('/test/:id').put(updateContact);
router.route('/test/:id').get(getContact);


router.route('/test/:id').delete(deleteContact );

module.exports=router