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
                              "value": barcodeInfo.value
                          };
                      } else {
                          customResult = {
                              "type": "value",
                              "code": barcodeInfo.code,
                              "creation": barcodeInfo.creation,
                              "expiry": barcodeInfo.expiry,
                              "value": barcodeInfo.remain
                          };
                      }
              
                      console.log(customResult);
                  } 
              
                  else if(result['status']=="used")
                  {
                    isUsed=true;
                  }
                  else if(result['status']=="inactive")
                  {
                    isUsed=true;
                  }

                  if(isUsed)
                  {
                    res.status(201).json({"status":"yes",
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
                    "data":"Invalid code"});
                }
            
               

            }
            else
            {      res.status(201).json({"status":"no",
            "data":"Enter valid code"});
            }
        }
        catch(e){
          res.status(201).json({"status":"no",
          "data":"Database error.No code found"});
            throw new Error("DB error")
        }
    }
}

module.exports={checkVoucher}