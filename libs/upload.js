const fs = require("fs");
const path = require("path");



module.exports={
  post_file:(multer,express,server,qyking)=>{
      // const multer = require("multer");
      // const qyking = require("./importantData");
      // const express = require("express");
      // var server = express();
      // server.listen(qyking.com.upload_port);

      var objMulter = multer({dest:qyking.com.upload_home});

      server.use(objMulter.any());
      server.post("/",(req,res)=>{
        // console.log(req.files[0].originalname);

        //add suffix  | yes or on
        let ok_Suffix = false;
        let suffix_up = "";
        try{
          if(path.parse(req.files[0].originalname).ext != undefined){
            suffix_up = path.parse(req.files[0].originalname).ext;}
        }catch(err){suffix_up = ""}

        for(let i = 0; i<qyking.com.up_file_ok.length; i++){
          let ok_file = "."+qyking.com.up_file_ok[i]
          if(suffix_up == ok_file){
            ok_Suffix=true;
          }
        }
        try{
          if (ok_Suffix){
            var newName = req.files[0].path+suffix_up;
            ok_Suffix = false;
          }else{
            var newName = req.files[0].path+".fuckyou";
            ok_Suffix = false;
          }
        }catch(err){
            newName="";
          }
        try{
          fs.rename(req.files[0].path,newName,(err)=>{
            if(err){
              res.send("upload err");
            }else {
              res.send("upload success!");
              console.log("NEW FILE:"+newName);
            }
          });
        }catch(err){
          res.send("upload err");
        }
      })
  }
}
