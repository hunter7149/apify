const voucherRepository = require('../repository/voucherRepository')
const checkVoucher = async (req,res) => {

    const  {code}=req.body;
    if(code)
    {
        try{
            tempcode=code.toString();
            if(tempcode.length ==16)
            {
                const result = await voucherRepository.checkBarCode(tempcode);
                // print(result[0]);
                console.log(result[0].status);
                const customResult={};
                 isUsed=false;

                if(result.length==1)
                {  let customResult;
                  const barcodeInfo = result[0];

                  if (barcodeInfo.status === "active") {
                    
              
                      if (barcodeInfo.percentage === true) {
                          customResult = {
                              "type": "percentage",
                              "code": barcodeInfo.code,
                              "creation": barcodeInfo.creation,
                              "expiry": barcodeInfo.expiry,
                              "value": barcodeInfo.value,
                              "status":barcodeInfo.status,
                          };
                      } else {
                          customResult = {
                              "type": "value",
                              "code": barcodeInfo.code,
                              "creation": barcodeInfo.creation,
                              "expiry": barcodeInfo.expiry,
                              "value": barcodeInfo.remain,
                              "status":barcodeInfo.status,
                          };
                      }
              
                      console.log(customResult);
                  } 
              
                  else if(result[0]['status']=="used")
                  {
                    isUsed=true;
                  }
                  else if(result[0]['status']=="inactive")
                  {
                    isUsed=true;
                  }

                  if(isUsed)
                  {
                    res.status(201).json({"status":"no",
                    "data":"used"});
                  }
                  else
                  {
                    res.status(201).json({"status":"yes",
                    "data":customResult});
                  }
             
                }
                else
                {
                    res.status(201).json({"status":"no",
                    "data":"invalid"});
                }
            
               

            }
            else
            {      res.status(201).json({"status":"no",
            "data":"Enter valid code"});
            }
        }
        catch(e){
          res.status(201).json({"status":"no",
          "data":"Voucher not found"});
            // throw new Error("DB error")
        }
    }
}
const updateVoucher=async (req,res)=>{

const {id,code,phone}=req.body;
try{
    const result = await voucherRepository.updateVoucher(code,phone,id,"used");
    console.log(result);
    res.status(201).json({"status":"yes","message":"success"})
}
catch(error){
  res.status(201).json({"status":"no","message":"failed"})
  throw new Error("DB error");
}

}
module.exports={checkVoucher,updateVoucher}

// {code,phone,id,}