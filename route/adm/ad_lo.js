const sig = require("../../libs/signature");
const mys = require("mysql");
const lim = require("../../libs/limit");
module.exports=(express,qyking)=>{
  let db = mys.createPool({host:qyking.com.db_host,user:qyking.com.db_use,password:qyking.com.db_password,database:qyking.com.database_name});




  let router=express.Router();

  //url admin_login_1 next

  ///jump post admin data!!
  router.post(qyking.com.admin_login_2+qyking.com.admin_login_post_key,(req,res)=>{
    // console.log(req.body);
    let use = req.body.use;
    let psw = sig.md5(req.body.pas,qyking.com.degree,qyking.com.safety_code);
    // res.end();
    db.query(`SELECT * FROM ad_super WHERE username='${use}'`,
    (err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send("err").end();
      }else{
        if(data.length>0){
          if(data[0].password == psw){
            req.session["admin_id"] = data[0].ID;
            res.redirect(qyking.com.admin_login_1);
            // res.send("successlogin").end();
          }else{
            res.status(400).send("err").end();
          }
        }else{
          res.status(400).send("err").end();
        }
      }
  });


  });



  //No entry   //all in
  router.use((req,res,next)=>{
    if(!req.session["admin_id"] && req.url != qyking.com.admin_login_2+".html")
      res.redirect("/wtf.html");
    else
      next();
  })

  ///jump login html///
  router.get(qyking.com.admin_login_2+".html",(req, res)=>{
    // res.send('admin success').end();
    res.render("adm/ad_login.ejs",{postUrl:qyking.com.admin_login_1+qyking.com.admin_login_2+qyking.com.admin_login_post_key})
  });

 //ad index↓
  router.get("/",(req,res)=>{
    if(!req.session["admin_id"])   //I know it's repeated, but I'm worried
      res.redirect("/wtf.html");  // :) 🍎 q
    else
      res.render("adm/index.ejs",{surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url});
  });

  //nav_1  banners
  router.get(qyking.com.ad_nav_url[0],(req,res)=>{
    if(!req.session["admin_id"]){
      res.redirect("/wtf.html");
    }else{
      db.query("SELECT * FROM `banner`",(err,data)=>{
        if(err){
          console.error(err);
          res.status(500).send("db err").end();
        }else{
          res.render("adm/banners.ejs",{surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url,banner:data});
        }
      });
    }
  });
  router.post(qyking.com.ad_nav_url[0],(req,res)=>{
    let title = req.body.title;
    let description = req.body.description;
    let href = req.body.href;
    if(!title || !description || !href){
      res.send("data null !").end();
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
        res.send("title too long !").end();
      }else{
        // console.log('3');

        if(description.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.description && regDES){
          res.send("description too long !").end();
        }else{
          //url ok?
          // let regular = /\.js|\.php|\.py|\.zip|\.7z|\.java|\.c|\.exe|\.cs|\.cpp|\.asp|\.jsp|\.aspx|\.dll|\.h/g.test(href);
          if (!new RegExp(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g).test(href)){
            res.send("url no http:// or https://  !").end();
          }else{
            let regURL = /\.jpg|\.png|\.jpeg|\.gif/g.test(href); ///bug!!! http://qyking.com/aaa.php?xx=.jpg
            let regURLS = /\.js|\.php|\.py|\.zip|\.7z|\.java|\.c|\.exe|\.cs|\.cpp|\.asp|\.jsp|\.aspx|\.dll|\.h/g.test(href);

            // console.log("4");
            if(!regURL){
              // console.log('5');
              res.send("url no routine image").end();
              }else{
                // console.log("6");
                if(regURLS)
                  res.send("url dangerous").end();

                  //'=>  &#39;
                // let ti = title.replace(/\'|\&#39;|\&#39/g,"&#39;");
                let ti = title.replace(/or/g,"&#q_1;");                               //&#q_1; => or🌙
                let de = description.replace(/or/g,"&#q_1;");
                let hr = href.replace(/or/g,"&#q_1;");
                // ???????asyn error 
                console.log(ti +" "+de+" "+hr);
                console.log("database add Warning!："+"`INSERT INTO banner (title,description,href) VALUE("+title+","+description+","+href+")")
                db.query(`INSERT INTO banner (title,description,href) VALUE('${ti}','${de}','${hr}')`,(err,data)=>{
                  if(err){
                    console.error(err);
                    res.status(500).send("db err").end();
                  }else{
                    res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[0]);
                  }
                });
            }
          }
        }
      }


      // res.send("ok").end();
    }catch(err){}
    }
  });

//nav_1  banners over


//over return
  return router;
};


///by-qy 2018
