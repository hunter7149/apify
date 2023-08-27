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
const updateVoucher = async (code,phone,id,sts)=>{
    const query = "UPDATE barcodes SET customer = $1,eid = $2,usedate = CURRENT_DATE,status = $3 WHERE code = $4";
    const values = [phone,id,sts,code]
    const result = await dbconnector.query(query,values);
    return result.rows;
}
module.exports={checkBarCode,updateVoucher};