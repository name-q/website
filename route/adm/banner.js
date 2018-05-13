module.exports =  function(express,qyking,db,log,lim){
  let router=express.Router();
  router.get("/",(req,res)=>{
    if(!req.session["admin_id"]){
      return res.redirect("/wtf.html");
    }else{
      //dell or mod banner
      switch (req.query.act) {
        case "mod":
          // get value
          if(new RegExp(/^[0-9]*$/).test(req.query.id)){
            db.query(`SELECT * FROM banner WHERE ID=${req.query.id}`,(err,data)=>{
              if(err){
                log.error(err);
                return res.status(500).send("db err").end();
              }else if(data.length == 0){
                return res.status(404).send("data none").end();
              }else{
                db.query("SELECT * FROM `banner`",(err,datas)=>{
                  if(err){
                    log.error(err);
                    return res.status(500).send("db err").end();
                  }else{
                    return res.render("adm/banners.ejs",{mod_data:data[0],surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url,banner:datas});
                  }
                });
              }
            });
          }else{
            log.error("admin=>URL=>"+qyking.com.admin_login_1+qyking.com.ad_nav_url[0]+"?act=mod&id="+req.query.id);
            return res.redirect("/wtf.html");
          }
          break;
        case "del":
          if(new RegExp(/^[0-9]*$/).test(req.query.id)){
            log.success("`DELETE FROM banner WHERE ID="+req.query.id);
            db.query(`DELETE FROM banner WHERE ID=${req.query.id}`,(err,data)=>{
              if(err){
                log.error(err);
                return res.status(500).send("db err").end();
              }else{
                res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[0]);
              }
            });
          }else{
            log.error("admin=>URL=>"+qyking.com.admin_login_1+qyking.com.ad_nav_url[0]+"?act=del&id="+req.query.id);
            return res.redirect("/wtf.html");
          }
          break;
        default:
          db.query("SELECT * FROM `banner`",(err,data)=>{
            if(err){
              log.error(err);
              return res.status(500).send("db err").end();
            }else{
              return res.render("adm/banners.ejs",{surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url,banner:data});
            }
          });
          break;
      }
    }
  });
  router.post("/",(req,res)=>{


    let title = req.body.title;
    let description = req.body.description;
    let href = req.body.href;
    if(!title || !description || !href){
      return res.status(400).send("data null !").end();
    }else{
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
      if(title.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.title){
        return res.status(400).send("title too long !").end();
      }else{
        // console.log('3');

        if(description.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.description){
          return res.status(400).send("description too long !").end();
        }else{
          //url ok?
          // let regular = /\.js|\.php|\.py|\.zip|\.7z|\.java|\.exe|\.cs|\.cpp|\.asp|\.jsp|\.aspx|\.dll|\.h/g.test(href);
          if (!new RegExp(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g).test(href)){
            return res.status(400).send("url no http:// or https://  !").end();
          }else{
            let regURL = /\.jpg|\.png|\.jpeg|\.gif/g.test(href); ///bug!!! http://qyking.com/aaa.php?xx=.jpg
            let regURLS = /\.js|\.php|\.py|\.zip|\.7z|\.java|\.exe|\.cs|\.cpp|\.asp|\.jsp|\.aspx|\.dll|\.h/g.test(href);

            // console.log("4");
            if(!regURL){
              // console.log('5');
              return res.status(400).send("url no routine image").end();
              }else{
                // console.log("6");
                if(regURLS)
                  return res.status(400).send("url dangerous").end();

                   //"=>  &#q_0;; 🌙
                  //'=>  &#q_1;; 🌙
                 //or => &#q_2; 🌙
                title = title.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
                description = description.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
                href = href.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");

                if (req.body.mod_id) {
                  //修改
                  if(new RegExp(/^[0-9]*$/).test(req.body.mod_id)){
                    log.success("database add Warning!："+"`UPDATE banner title="+title+",description="+description+",href="+href+"WHERE ID="+req.body.mod_id);
                    db.query(`UPDATE banner SET title="${title}",description="${description}",href="${href}" WHERE ID="${req.body.mod_id}"`,(err,data)=>{
                      if(err){
                        log.error(err);
                        return res.status(500).send("url long err").end();
                      }else{
                        return res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[0]);
                      }
                    });
                  }else{
                    log.error("修改banner传入非法ID："+req.body.mod_id);
                    return res.status(500).send("id err").end();
                  }
                }else{
                  // 添加
                  log.success("database add Warning!："+"`INSERT INTO banner (title,description,href) VALUE("+title+","+description+","+href+")")
                  db.query(`INSERT INTO banner (title,description,href) VALUE("${title}","${description}","${href}")`,(err,data)=>{
                    if(err){
                      log.error(err);
                      return res.status(500).send("url long err").end();
                    }else{
                      return res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[0]);
                    }
                  });
                }
            }
          }
        }
      }


      // res.send("ok").end();
    }catch(err){}
    }
  });
  return router;
}
