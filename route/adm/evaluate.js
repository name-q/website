// const Q_up = require("../../libs/upload");
// const lim = require("../../libs/limit");
const mul = require("multer");
const fs = require("fs");
const pathLib = require("path");



module.exports =  function(express,qyking,db,log,lim){
  let router=express.Router();
//evaluate
  router.get("/",(req,res)=>{
    switch (req.query.act) {
      case 'del':
        db.query(`SELECT * FROM evaluate WHERE ID=${req.query.id}`
        ,(err,data)=>{
          if(err){
            log.error("evaluate查询ID="+req.query.id+"时出错:"+err);
            res.status(500).send('db err').end();
          }else{
            if(data.length == 0){
              res.status(404).send('none').end();
            }else{
              //data.src中包含了当初的上传路径，寻址为static path+..
              //fs jump ./
              fs.unlink(qyking.com.www_static+data[0].src,(err)=>{
                if(err){
                  log.error("evaluate删除src="+data[0].src+"时出错:"+err);
                  res.status(500).send('err').end();
                }else {
                  log.success("evaluate删除file:"+data[0].src);
                  db.query(`DELETE FROM evaluate WHERE ID=${req.query.id}`
                  ,(err,data)=>{
                    if(err){
                      log.error("evaluate删除ID="+req.query.id+"时出错:"+err);
                      res.status(500).send('db err').end();
                    }else{
                      res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                    }
                  });
                }
              });
            }
          }
        });
        break;
      case 'mod':
        db.query(`SELECT * FROM evaluate WHERE ID=${req.query.id}`
        ,(err,data_m)=>{
          if(err){
            log.error("evaluate查询mod,ID="+req.query.id+"时出错:"+err);
            res.status(500).send('db err').end();
          }else{
            if(data_m.length == 0){
              res.status(404).send('none').end();
            }else{
              db.query(`SELECT * FROM evaluate`,(err,data)=>{
                if(err){
                  log.error("evaluate mod err"+err);
                  return res.status(500).send("db err").end();
                }else{
                  return res.render("adm/evaluate.ejs",{mod_data:data_m[0],evaluate:data,surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url});
                }
              });
            }
          }
        });
        break;
      default:
        db.query(`SELECT * FROM evaluate`,(err,data)=>{
          if(err){
            log.error("evaluate err"+err);
            return res.status(500).send("db err").end();
          }else{
            return res.render("adm/evaluate.ejs",{evaluate:data,surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url});
          }
        });
    }

  });


  //post
  router.post("/",mul({dest:qyking.com.upload_home,limits:{files:1,fileSize:1*1024*1024,fieldNameSize:100},}).single("headI"),(req,res)=>{
    //获取数据并限制
    let title = req.body.title;
    let description = req.body.description;
    if(!title || !description){//🍎
      return res.status(400).send("data null !").end();
    }else{
      try{
        if(title.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.ev_title){
          return res.status(400).send("title too long !").end();
        }else{
          if(description.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.ev_description){
            return res.status(400).send("description too long !").end();
          }else{
            title = title.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
            description = description.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
            //数据处理完成

            //suffix开始
            let ok_Suffix = false;
            let suffix_up = "";
            let who = "evaluate.js";
            // console.log(req.file+title+description);
            //不存在传入照片和mod
            if(!req.file && !req.body.mod_id){
              // console.log("不存在照片和mod");
              return res.status(404).send("image ?").end();
            }
            //不存在照片 存在mod
            if(req.body.mod_id && !req.file){
              if(new RegExp(/^[0-9]*$/).test(req.body.mod_id))
              {
                // console.log("不存在照片 存在mod");
                log.success("database UPDATE Warning!："+"`UPDATE banner title="+title+",description="+description+"WHERE ID="+req.body.mod_id);
                db.query(`UPDATE evaluate SET title="${title}",description="${description}" WHERE ID="${req.body.mod_id}"`,(err,data)=>{
                  if(err){
                    log.error("evaluate update err:"+err);
                    return res.status(500).send("LONG err").end();
                  }else{
                    return res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                  }
                });
              }else{
                log.error("evaluate传入非法ID："+req.body.mod_id);
                return res.status(500).send("id err").end();
              }
            }
            try{
              if(pathLib.parse(req.file.originalname).ext != undefined){
                suffix_up = pathLib.parse(req.file.originalname).ext;
              }
            }catch(err){}
            for(let i = 0; i<lim.limit.ev_suffix_ok.length; i++){
              let ok_file = "."+lim.limit.ev_suffix_ok[i];
              if(suffix_up == ok_file){
                ok_Suffix=true;
              }
            }
            try{
              if (ok_Suffix){
                var newName = req.file.path+suffix_up;
                ok_Suffix = false;
                var equally = true;
              }else{
                var newName = req.file.path+".fuckyou"
                ok_Suffix = false;
              }
            }catch(err){
                var newName="";
              }
            try{
              fs.rename(req.file.path,newName,(err)=>{
                if(err){
                  log.error("改名出错，来自:"+who+"|文件名:"+newName+"错误:"+err);
                  return res.status(500).send("err").end();
                }else {
                  //suffix结束
                  // console.log("0");

                  if(equally){
                    log.success("新文件，来自:"+who+"|文件名:"+newName);
                    let web_up_path = qyking.com.upload_home.replace(qyking.com.www_static,"");
                    let newFileName = web_up_path+pathLib.parse(newName).base;
                    // pathLib.parse// { root: '/',
                    //               //   dir: '/home/user/dir',
                    //               //   base: 'file.txt',
                    //               //   ext: '.txt',
                    //               //   name: 'file' }
                    // console.log("1"+qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                    //存在照片和mod
                    if(req.body.mod_id && req.file){
                      if(new RegExp(/^[0-9]*$/).test(req.body.mod_id))
                      {
                        // console.log("存在照片和mod");
                        //删除旧照片
                        db.query(`SELECT * FROM evaluate WHERE ID=${req.body.mod_id}`
                        ,(err,data)=>{
                          if(err){
                            log.error("evaluate查询ID="+req.body.mod_id+"时出错:"+err);
                            res.status(500).send('db err').end();
                          }else{
                            if(data.length == 0){
                              res.status(404).send('none').end();
                            }else{
                              fs.unlink(qyking.com.www_static+data[0].src,(err)=>{
                                if(err){
                                  log.error("evaluate删除src="+data[0].src+"时出错:"+err);
                                  res.status(500).send('err').end();
                                }else {
                                  log.success("evaluate删除file:"+data[0].src);
                                  //更新db
                                  log.success("database UPDATE Warning!："+"`UPDATE evaluate title="+title+",description="+description+",description="+",src="+newFileName+"WHERE ID="+req.body.mod_id);
                                  db.query(`UPDATE evaluate SET title="${title}",description="${description}",src="${newFileName}" WHERE ID="${req.body.mod_id}"`,(err,data)=>{
                                    if(err){
                                      log.error("evaluate update err:"+err);
                                      return res.status(500).send("LONG err").end();
                                    }else{
                                      return res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                                    }
                                  });
                                }
                              });
                            }
                          }
                        });
                      }else{
                        log.error("evaluate传入非法ID："+req.body.mod_id);
                        return res.status(500).send("id err").end();
                      }
                    }else {
                      //添加
                      db.query(`INSERT INTO evaluate (title,description,src) VALUES("${title}","${description}","${newFileName}")`,(err,data)=>{
                          if(err){
                            log.error("增加数据出错:title:|"+title+"| description:|"+description+"| src:|"+newFileName+"|");
                            res.status(500).send("db err").end();
                          }else{
                            // console.log(qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                            log.success("增加用户评价:title:|"+title+"| description:|"+description+"| src:|"+newFileName+"|");
                            res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[3]);
                          }
                        });
                    }
                  }else{
                    log.success("不合规定文件，来自:"+who+"|文件名:"+newName);
                    equally = false;
                  }
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
