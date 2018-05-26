// const Q_up = require("../../libs/upload");
// const lim = require("../../libs/limit");
const mul = require("multer");
const fs = require("fs");
const pathLib = require("path");



module.exports =  function(express,qyking,db,log,lim){
  let router=express.Router();
//evaluate
  router.get("/",(req,res)=>{
    db.query(`SELECT * FROM evaluate`,(err,data)=>{
      if(err){
        log.error("evaluate err"+err);
        return res.status(500).send("db err").end();
      }else{
        // console.log(data);
        return res.render("adm/evaluate.ejs",{evaluate:data,surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url});
      }
    })
  });


  //post
  router.post("/",mul({dest:qyking.com.upload_home,limits:{files:1,fileSize:1*1024*1024,fieldNameSize:100},}).single("headI"),(req,res)=>{
    //获取数据并限制
    let title = req.body.title;
    let description = req.body.description;
    let src = req.body.src;
    if(!title || !description){//🍎 || !src
      return res.status(400).send("data null !").end();
    }else{
      // console.log(title+" "+description);

      try{
                                      // console.log("1");
                                      // let regTIT = /\'|\’/g.test(title);
                                      // let regDES = /\'|\’/g.test(description);
                                      // if(regTIT)
                                      //   res.send("title malice!").end();
                                      // if(regDES)
                                      //   res.send("description malice!").end();
        // console.log('2');
        //length ->font
        if(title.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.ev_title){
          return res.status(400).send("title too long !").end();
        }else{
          // console.log('3');

          if(description.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.ev_description){
            return res.status(400).send("description too long !").end();
          }else{
                                      // //url ok?
                                      // // let regular = /\.js|\.php|\.py|\.zip|\.7z|\.java|\.exe|\.cs|\.cpp|\.asp|\.jsp|\.aspx|\.dll|\.h/g.test(href);
                                      // if (!new RegExp(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g).test(href)){
                                      //   return res.status(400).send("url no http:// or https://  !").end();
                                      // }else{
                                      //   let regURL = /\.jpg|\.png|\.jpeg|\.gif/g.test(href); ///bug!!! http://qyking.com/aaa.php?xx=.jpg
                                      //   let regURLS = /\.js|\.php|\.py|\.zip|\.7z|\.java|\.exe|\.cs|\.cpp|\.asp|\.jsp|\.aspx|\.dll|\.h/g.test(href);
                                      //
                                      //   // console.log("4");
                                      //   if(!regURL){
                                      //     // console.log('5');
                                      //     return res.status(400).send("url no routine image").end();
                                      //     }else{
                                      //       // console.log("6");
                                      //       if(regURLS)
                                      //         return res.status(400).send("url dangerous").end();
                   //"=>  &#q_0;; 🌙
                  //'=>  &#q_1;; 🌙
                 //or => &#q_2; 🌙
            title = title.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
            description = description.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
            // src = src.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
            //数据校验完成
            //🍎multer提供支持 ，后缀修改🍎🍎
            // console.log(req.file);
            let ok_Suffix = false;
            let suffix_up = "";
            let who = "evaluate.js";
            console.log(req.file);

            try{
              // console.log("源："+pathLib.parse(req.file.originalname).ext);

              if(pathLib.parse(req.file.originalname).ext != undefined){
                suffix_up = pathLib.parse(req.file.originalname).ext;
              }
            }catch(err){
            }
            for(let i = 0; i<lim.limit.ev_suffix_ok.length; i++){
              let ok_file = "."+lim.limit.ev_suffix_ok[i];
              // console.log(ok_file+"&&"+suffix_up);

              if(suffix_up == ok_file){
                ok_Suffix=true;
                // console.log("合理");
              }
            }
            try{
              if (ok_Suffix){
                var newName = req.file.path+suffix_up;
                // console.log("1"+newName);
                ok_Suffix = false;
                var equally = true;
              }else{
                var newName = req.file.path+".fuckyou"
                ok_Suffix = false;
                // console.log("2"+newName);
              }
            }catch(err){
                var newName="";
                // console.log("3"+newName);
              }
            try{
              fs.rename(req.file.path,newName,(err)=>{
                if(err){
                  // console.log("出错");
                  log.error("改名出错，来自:"+who+"|文件名:"+newName+"错误:"+err);
                  return res.status(500).send("err").end();
                }else {
                  // console.log("成功");
                  if(equally){
                    log.success("新文件，来自:"+who+"|文件名:"+newName);
                    //suffix ===
                    if(req.body.mod_id){
                      //修改
                      console.log("0");
                    }else {
                      //添加
                      let web_up_path = qyking.com.upload_home.replace(qyking.com.www_static,"");
                      let newFileName = web_up_path+pathLib.parse(newName).base;
                      // pathLib.parse// { root: '/',
                      //               //   dir: '/home/user/dir',
                      //               //   base: 'file.txt',
                      //               //   ext: '.txt',
                      //               //   name: 'file' }
                      console.log("1"+qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                      db.query(`INSERT INTO evaluate (title,description,src) VALUES("${title}","${description}","${newFileName}")`),
                        (err,data)=>{
                          if(err){
                            log.error("增加数据出错:title:|"+title+"| description:|"+description+"| src:|"+newFileName+"|");
                            res.status(500).send(err).end();
                          }else{
                            console.log("2");
                            console.log(qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                            log.success("增加用户评价:title:|"+title+"| description:|"+description+"| src:|"+newFileName+"|");

                            res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                          }
                        };
                    }
                    // equally = false;
                  }else{
                    log.success("不合规定文件，来自:"+who+"|文件名:"+newName);
                    equally = false;
                  }
                  // console.log("NEW FILE:"+newName);
                }
              });
            }catch(err){
              log.error("改名严重出错，来自:"+who+"|文件名:"+newName+"源:"+req_files+"错误:"+err);
              return res.status(500).send("file err").end();
            }
            //🍎🍎🍎end 后缀




          }
        }
      }catch(err){}
    }
  });


  //over
  return router;
}


//by qy 2018
