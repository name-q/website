const sig = require("../../libs/signature");
const mys = require("mysql");

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


  router.get("/",(req,res)=>{
    if(!req.session["admin_id"])
      res.redirect("/wtf.html");
    else
      res.render("adm/index.ejs",{surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url});
  });


//over return
  return router;
};


///by-qy 2018
