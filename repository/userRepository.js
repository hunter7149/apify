
const dbconnector=require('../database/databaseClient');
dbconnector.connect();


const createUser =async (user) => {
try{

        //Query format : INSERT INTO students (column names) VALUES (indexes of the values of)
        const { id,name, email, phone,role } = user;
        const query = 'INSERT INTO users (id,name, email, phone,role) VALUES ($1, $2, $3,$4,$5) RETURNING *';
        const values = [id,name, email, phone,role ];
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
        const query = "SELECT * from users";
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
        const query = `SELECT * from users WHERE id = $1`;
        const result = await dbconnector.query(query,[id]);
        return result.rows[0];
    }
    catch(error){
        throw new Error("Couldn't get user at R----get")
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

module.exports={
    createUser,
    getAllUser,
    getSingleUser,updateSingleUser,deleteUser
}