//@desc Get all contacts
//@route GET /contact
//@access public

const getContacts = (req, res) => {res.status(200).json({data:'Hello Get Method!'})};

//@desc Create all contacts
//@route POST /contact
//@access public

const createContact =  (req, res) => {
    console.log("This is the request:",req.body) ;
    res.status(200).json({data:'Hello Post method!'})};

//@desc update all contacts
//@route PUT /contact
//@access public

const updateContact =  (req, res) =>{ res.status(200).json({data:`Hello Update method of id ${req.params.id} !`})};
//@desc delete all contacts
//@route DELETE /contact
//@access public

const deleteContact = (req, res) => {res.status(200).json({data:`Hello Delete method of id ${req.params.id}!`})};

//@desc Get all contacts
//@route GET /contact
//@access public

const getContact =  (req, res) => {
   
    res.status(200).json({data:`Profile of  id ${req.params.id} !`})};

module.exports={getContact,createContact,updateContact,deleteContact,getContacts};