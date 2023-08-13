
const dbconnector=require('../database/databaseClient');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); 
dbconnector.connect();


const createUser =async (user,password) => {
try{

        //Query format : INSERT INTO students (column names) VALUES (indexes of the values of)
        const { id,name, email, phone,role } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (id,name, email, phone,role,password) VALUES ($1, $2, $3,$4,$5,$6) RETURNING id,name,email,phone,role';
        const values = [id,name, email, phone,role,hashedPassword ];
        const result = await dbconnector.query(query, values);
     
        console.log(result);
        return result.rows;

   
}
catch(error){
 throw new Error("User creation failed at R----cret");
}
}

const getAllUser = async () =>{
    try{
        const query = "SELECT id,name,email,phone from users";
        const result = await dbconnector.query(query);
        return result.rows;
    }
    catch(error){
        throw new Error("Couldn't get under at R----get")
    }
}

const getSingleUser = async (uid) =>{
    try{
        const id  = uid;
        const query = `SELECT id, name, email, phone, role FROM users WHERE id = $1`;
        const result = await dbconnector.query(query,[id]);
        return result.rows[0];
    }
    catch(error){
        throw new Error("Couldn't get user at R----get");
    }
}
const getSingleUserByPhone = async (phone)=>{
    try{
        const phoneNumber = phone;
        const query = `SELECT name,phone,email FROM customer WHERE phone=$1`;
        const result = await dbconnector.query(query,[phoneNumber]);
     
        if(result.rows.length!=0){
            return result.rows[0];
        }
        else{
            return [];
        }
    }
    catch (error){
        throw new Error("Couldn't get user by phone!");
    }
}
const updateSingleUser = async (user)=>{
    try{
        const{id,name,email,phone,role} = user;
        const query = `UPDATE users SET name = $2, email = $3, phone=$4,role = $5 WHERE id = $1 RETURNING *`;
        const value = [id,name,email,phone,role];
        const result=await dbconnector.query(query,value);
        if (result.rowCount === 0) {
            // If rowCount is 0, no rows were deleted, which means the user wasn't found
            return { message: 'User not found or already deleted.' };
          } else {
            // If rowCount is greater than 0, the user was successfully deleted
            return { message: 'User updated  successfully!' ,
                        user: result.rows[0]};
          }
    }
    catch (error){
        throw new Error("Update failed at R---upt ");
    }
}

const deleteUser=async (uid) => {
try {    const id=uid;
    const query = `DELETE FROM users WHERE id = $1`;
    const result = await dbconnector.query(query,[id]);
    if (result.rowCount === 0) {
        // If rowCount is 0, no rows were deleted, which means the user wasn't found
        return { message: 'User not found or already deleted.' };
      } else {
        // If rowCount is greater than 0, the user was successfully deleted
        return { message: 'User deleted successfully!' };
      }  return result.rows;

}
    catch (error){
throw new Error("Couldn't delete user at R---del");
    }
}
const getPass = async (uid)=>{
    try{
        const id  = uid;
        const query = `SELECT password from users WHERE id = $1`;
        const result = await dbconnector.query(query,[id]);
        // console.log(result.rows[0]);
        return result.rows[0];
        
        // console.log(result.rows[0]);
    }
    catch(error){
        throw new Error("Couldn't get user at R----get")
    }
}

const getToken = async (uid)=>{
    try{

        console.log(`Request from ${uid}`)
        const id  = uid;
        const query = `SELECT token,key from logincreds WHERE id = $1`;
        const result = await dbconnector.query(query,[id]);
        // console.log(result.rows[0]);
        return result.rows[0];
     
    }
    catch(error){
        throw new Error("Couldn't get token at R----get")
    }
}

const loginReq = async (uid,password) => {
  
try{
    const dbpass = await getPass(uid);
    if(dbpass)
    {
        const isPasswordValid = await bcrypt.compare(password, dbpass.password);
        if (!isPasswordValid) {
          return { "error": 'Invalid credentials' };
        }
        else{
        const secretKey = generateSecretKey();
        const token = jwt.sign({ uid }, secretKey, { expiresIn: '30d' });
             const query = `INSERT INTO logincreds (id, token,key) VALUES ($1,$2,$3) ON CONFLICT (id) DO UPDATE SET token = EXCLUDED.token,key=EXCLUDED.key RETURNING *`;
            const values = [uid,token,secretKey];
            try{
                const result = await dbconnector.query(query,values);
                if(result){
                    return { "status":"success","accessToken":token };
                }
             
            }
            catch (error){
                console.log(error);
            }
          
                
               
            
      
        }
      
   
    }
    else
    {
        return { "status":"failed","accessToken":"Invalid password" };
    }
}
catch(error){
    throw new Error("Database error");
}
}
const createCustomer =async (name,phone,email) => {
    try{
    
            //Query format : INSERT INTO students (column names) VALUES (indexes of the values of)
       

    
            const query = 'INSERT INTO customer (name, email, phone) VALUES ($1, $2, $3) RETURNING name,email,phone';
            const values = [name, email, phone];
            const result = await dbconnector.query(query, values);
         
            console.log(result);
            if(result.rows.length!=0){
                return result.rows[0];
            }
            else{
                return [];
            }
            
    
       
    }
    catch(error){
     throw new Error("Customer creation failed at R----cret");
    }
    }
function generateSecretKey() {
    return uuidv4();
  }
module.exports={
    createUser,
    getAllUser,
    getSingleUser,updateSingleUser,deleteUser,getPass,loginReq,getToken,getSingleUserByPhone,createCustomer
}