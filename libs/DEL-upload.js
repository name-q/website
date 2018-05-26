const fs = require("fs");
const path = require("path");
const log = require("./write_log");


module.exports={
  post_file:(multer,express,server,qyking)=>{
      // const multer = require("multer");
      // const qyking = require("./importantData");
      // const express = require("express");
      // var server = express();
      // server.listen(qyking.com.upload_port);

      var objMulter = multer({dest:qyking.com.upload_home});

      server.use(objMulter.any());
  },
  F_suffix:(limit,who,req_files)=>{
      //in router, suffix ok?    inport suffix limit  arr["jpg","png"] &&who upload (file js) && req.files
      // console.log(req.files[0].originalname);  //by qy
      //add suffix  | yes or on
      let ok_Suffix = false;
      let suffix_up = "";
      // console.log(req_files);
      try{
        if(path.parse(req_files[0].originalname).ext != undefined){
          // console.log(path.parse(req_files[0].originalname).ext);
          suffix_up = path.parse(req_files[0].originalname).ext;}
      }catch(err){suffix_up = ""}

      for(let i = 0; i<limit.length; i++){
        let ok_file = "."+limit[i];
        // console.log(ok_file+"&&"+suffix_up);

        if(suffix_up == ok_file){
          ok_Suffix=true;
          // console.log("合理");
        }
      }
      try{
        if (ok_Suffix){
          let newName = req_files[0].path+suffix_up;
          return newName;

          ok_Suffix = false;
        }else{
          let newName = req_files[0].path+".fuckyou";
          return newName;

          ok_Suffix = false;
        }
      }catch(err){
          let newName="";
          return newName;

        }
      // try{
      //   fs.rename(req.files[0].path,newName,(err)=>{
      //     if(err){
      //       // console.log("出错");
      //       log.error("改名出错，来自:"+who+"|文件名:"+newName+"错误:"+err);
      //       return res.status(500).send("err").end();
      //     }else {
      //       // console.log("成功");
      //       log.success("新文件，来自:"+who+"|文件名:"+newName);
      //       // console.log("NEW FILE:"+newName);
      //     }
      //   });
      // }catch(err){
      //   log.error("改名严重出错，来自:"+who+"|文件名:"+newName+"源:"+req_files+"错误:"+err);
      //   return res.status(500).send("err").end();
      // }
  },
}
