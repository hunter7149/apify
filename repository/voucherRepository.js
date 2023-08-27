const dbconnector=require('../database/databaseClient');
dbconnector.connect();

const checkBarCode=async (code) => {
    try{
        const query = "SELECT * from barcodes WHERE code=$1";
        const values = [code]
        const result = await dbconnector.query(query,values);
        return result.rows;
    }
    catch (error){
        return [];
    }
}
module.exports={checkBarCode};