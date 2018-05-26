const sig = require("../../libs/signature");
const mys = require("mysql");
const lim = require("../../libs/limit");
const log = require("../../libs/write_log");

module.exports=(express,qyking)=>{
  let db = mys.createPool({host:qyking.com.db_host,user:qyking.com.db_use,password:qyking.com.db_password,database:qyking.com.database_name});

  let router=express.Router();




  ///ad login post
  router.post(qyking.com.admin_login_2+qyking.com.admin_login_post_key,(req,res)=>{
    // console.log("1");
    // console.log(req.body);
    let use = req.body.use;
    let psw = sig.md5(req.body.pas,qyking.com.degree,qyking.com.safety_code);
    // res.end();

    //"=>  &#q_0;; 🌙
     //'=>  &#q_1;; 🌙
       //or => &#q_2; 🌙
    use = use.replace(/"/g,"&#q_0;").replace(/'/g,"&#q_1;").replace(/or/g,"&#q_2;");
    // console.log("2");


    log.success("管理员登入 username="+use)
    db.query(`SELECT * FROM ad_super WHERE username='${use}'`,
    (err,data)=>{
      if(err){
        log.error(err);
        return res.status(500).send("err").end();
      }else{
        if(data.length>0){
          if(data[0].password == psw){
            req.session["admin_id"] = data[0].ID;
            return res.redirect(qyking.com.admin_login_1);
            // res .send("successlogin").end();
          }else{
            return res.status(400).send("err").end();
          }
        }else{
          return res.status(400).send("err").end();
        }
      }
    });
  });

  //url is login or login success?   all
  router.use((req,res,next)=>{
    if(!req.session["admin_id"] && req.url != qyking.com.admin_login_2+".html")
      return res.redirect("/wtf.html");
    else
      next();
  })

  ///return login page///
  router.get(qyking.com.admin_login_2+".html",(req, res)=>{
    // res.send('admin success').end();
    return res.render("adm/ad_login.ejs",{postUrl:qyking.com.admin_login_1+qyking.com.admin_login_2+qyking.com.admin_login_post_key})
  });



 //ad index↓
  router.get("/",(req,res)=>{
    if(!req.session["admin_id"])   //I know it's repeated, but I'm worried
      return res.redirect("/wtf.html").end();  // :) 🍎 q
    else
      return res.render("adm/index.ejs",{surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url});
  });

  //nav_1  banners
  router.use(qyking.com.ad_nav_url[0],require("./banner.js")(express,qyking,db,log,lim));

  //nav_4  evaluate
  router.use(qyking.com.ad_nav_url[3],require("./evaluate.js")(express,qyking,db,log,lim));

//over return
  return router;
};


///by-qy 2018
