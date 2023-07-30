const User = require("../entity/users");
const userRepository = require('../repository/userRepository');


//Creating an user
const createUser = async (req, res) => {
  try {
    const {id, name, email, phone,role } = req.body;

    if(!id )
    {
        res.status(400).json({ error: 'id field is mandatory' });
    }
    else if(!name )
    {
        res.status(400).json({ error: 'name field is mandatory' });
    }else if(!email )
    {
        res.status(400).json({ error: 'email field is mandatory' });
    }else if(!phone )
    {
        res.status(400).json({ error: 'phone field is mandatory' });
    }else if(!role )
    {
        res.status(400).json({ error: 'role field is mandatory' });
    }
    else
    {
        // console.log(res);
        const tempUser = new User(id,name,email,phone,role);
        const addedstudent = await userRepository.createUser(tempUser);
        res.status(201).json(addedstudent);
    }


  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.Maybe user already exist.' });
  }
};

//updating an user
const updateUser = async (req, res) => {
    try {
      const {id, name, email, phone,role } = req.body;
  
      if(!id )
      {
          res.status(400).json({ error: 'id field is mandatory' });
      }
      else if(!name )
      {
          res.status(400).json({ error: 'name field is mandatory' });
      }else if(!email )
      {
          res.status(400).json({ error: 'email field is mandatory' });
      }else if(!phone )
      {
          res.status(400).json({ error: 'phone field is mandatory' });
      }else if(!role )
      {
          res.status(400).json({ error: 'role field is mandatory' });
      }
      else
      {
          // console.log(res);
          const tempUser = new User(id,name,email,phone,role);
          const addedstudent = await userRepository.updateSingleUser(tempUser);
          res.status(201).json(addedstudent);
      }
  
  
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user.' });
    }
  };

  //getAllUser
const getAllUser= async (req,res) => {
    try{
        const result=await userRepository.getAllUser();
        res.status(201).json(result);
    }
    catch (error){
        throw new Error("Can't get user ");
    }


}

//getSingleUser
const getSingleUser=async (req,res)=>
{
    try {
        const {id, } = req.body;
    
        if(!id )
        {
            res.status(400).json({ error: 'id field is mandatory' });
        }
      
        else
        {
            // console.log(res);
         
            const user = await userRepository.getSingleUser(id);
            res.status(201).json(user);
        }
    
    
      } catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
      }
}
//delete single user
const deleteSingleUser=async (req,res)=>
{
    try {
        const {id, } = req.body;
    
        if(!id )
        {
            res.status(400).json({ error: 'id field is mandatory' });
        }
      
        else
        {
            // console.log(res);
         
            const user = await userRepository.deleteUser(id);
            res.status(201).json(user);
        }
    
    
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
      }
}
module.exports={createUser,updateUser,getAllUser,getSingleUser,deleteSingleUser};