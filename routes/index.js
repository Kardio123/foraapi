var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/jsonPush', function(req, res, next) {
  try{
    // const handleStoreData=function(data){
    //       return new Promise((resolve,reject)=>{
    //         //fake post the database's endpoint
    //           axios
    //           .post('Your own db endpoint', data)
    //           .then((res) => {
    //             resolve(res)
    //           })
    //           .catch((err) => {
    //             reject(err)
    //           })
    //       }).catch((err)=>{
    //         return err
    //       })
    //   }
    const formatter = function(patietnId, customField1, customField2, item){
      return{
          _id : item["MDataID"],
          patientId : patietnId,
          customField1 :customField1,
          customField2 : customField2,
          date : item["MDateTimeUTC"],
          value1 : item["MValue1"],
          value2 : item["MValue2"],
          value3 : item["MValue2"],
          type: item["MType"],
          serial: item["MDeviceID"]
        }
    }
    const postResult ={
      /*Methods are separated for demonstration and understanding purpose*/
             success:function(data){
                let resultData = {ResultData:{...data,
                                              OStatus:"S",
                                              OResultCode:"200"
                                             }
                                  }
                   resultData.ResultData.MeasureData.forEach((e,i)=>{
                       resultData.ResultData.MeasureData[i]=
                                  {...e,
                                   OStatus:"S",
                                   OresultCodeL:"200"
                                  }
                })
                return resultData
             },
             fail:function(data){
                let resultData = {ResultData:{...data,
                                              OStatus:"F",
                                              OResultCode:"400"
                                             }
                 }
                resultData.ResultData.MeasureData.forEach((e,i)=>{
                     resultData.ResultData.MeasureData[i]=
                          {...e,
                           OStatus:"F",
                           OresultCodeL:"400"
                          }
                })
                return resultData
             }
    }
    const postData = req.body
    const data = postData.UploadData
    const dataLength = data.MeasureData.length
    const array=[]
    for(let i=0;i<dataLength;i++){
        array.push(formatter(data.PatientID, data.CustomField1, data.CustomField2, data.MeasureData[i]))
    }
    //let result = await handleStoreData(array)
    /////////////////////////////////////////////
    // push a fake result code to formate success response
    let result = {
      data:{
        code:200
      }
    }
    ////////////////////////////////////////////
    if(result.data.code===200){
       res.status(200).json(postResult.success(data))
    }else{
       res.status(400).json(postResult.fail(data))
    }
    }catch(err){
      console.log(err)
      res.status(500).json({code:5000,message:"An error has occurred"})
    }
});

module.exports = router;
