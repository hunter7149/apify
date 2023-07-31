
// Middleware to verify the JWT token
const userRepository = require('../repository/userRepository')
const jwt = require("jsonwebtoken");
const  authenticateToken =async (req, res, next)=> {
    const reqtoken = req.headers.authorization?.split(' ')[1];
    if (!reqtoken) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    const {id}= req.body;
    const {token,key}= await userRepository.getToken(id);
    if(token)
    {
        jwt.verify(reqtoken, key, (err, decoded) => {
            console.log(reqtoken==token);
            if (err) {
              return res.status(401).json({ error: 'Invalid token' });
            }
            else{
                req.user = decoded;
                next();
            }
          
          });
    }

  }
  module.exports=authenticateToken;