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
    //"=>  &#q_0;; 🌙
    let Qus = use.replace(/"/g,"&#q_0;");
      //'=>  &#q_1;; 🌙
    let Quser = Qus.replace(/'/g,"&#q_1;");
     //or => &#q_2; 🌙
    let Quse = Quser.replace(/or/g,"&#q_2;");

    db.query(`SELECT * FROM ad_super WHERE username='${Quse}'`,
    (err,data)=>{
      if(err){
        console.log(err);
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



  //No entry   //all in
  router.use((req,res,next)=>{
    if(!req.session["admin_id"] && req.url != qyking.com.admin_login_2+".html")
      return res.redirect("/wtf.html");
    else
      next();
  })

  ///jump login html///
  router.get(qyking.com.admin_login_2+".html",(req, res)=>{
    // res.send('admin success').end();
    return res.render("adm/ad_login.ejs",{postUrl:qyking.com.admin_login_1+qyking.com.admin_login_2+qyking.com.admin_login_post_key})
  });

 //ad index↓
  router.get("/",(req,res)=>{
    if(!req.session["admin_id"])   //I know it's repeated, but I'm worried
      return res.redirect("/wtf.html");  // :) 🍎 q
    else
      return res.render("adm/index.ejs",{surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url});
  });

  //nav_1  banners
  router.get(qyking.com.ad_nav_url[0],(req,res)=>{
    if(!req.session["admin_id"]){
      return res.redirect("/wtf.html");
    }else{
      db.query("SELECT * FROM `banner`",(err,data)=>{
        if(err){
          console.error(err);
          return res.status(500).send("db err").end();
        }else{
          return res.render("adm/banners.ejs",{surls:qyking.com.admin_login_1,ad_nav_name:qyking.com.ad_nav_name,ad_nav_title:qyking.com.ad_nav_title,ad_nav_url:qyking.com.ad_nav_url,banner:data});
        }
      });
    }
  });
  router.post(qyking.com.ad_nav_url[0],(req,res)=>{
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

        if(description.replace(/[\u0391-\uFFE5]/g,"qy").length/2 > lim.limit.description && regDES){
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
                let titl = title.replace(/"/g,"&#q_0;");
                let desc = description.replace(/"/g,"&#q_0;");
                let Qhre = href.replace(/"/g,"&#q_0;");
                  //'=>  &#q_1;; 🌙
                let tit = titl.replace(/'/g,"&#q_1;");
                let des = desc.replace(/'/g,"&#q_1;");
                let hre = Qhre.replace(/'/g,"&#q_1;");
                 //or => &#q_2; 🌙
                let ti = tit.replace(/or/g,"&#q_2;");
                let de = des.replace(/or/g,"&#q_2;");
                let hr = hre.replace(/or/g,"&#q_2;");

                // console.log(ti +" "+de+" "+hr);
                console.log("database add Warning!："+"`INSERT INTO banner (title,description,href) VALUE("+ti+","+de+","+hr+")")
                db.query(`INSERT INTO banner (title,description,href) VALUE("${ti}","${de}","${hr}")`,(err,data)=>{
                  if(err){
                    console.error(err);
                    return res.status(500).send("url long err").end();
                  }else{
                    return res.redirect(qyking.com.admin_login_1+qyking.com.ad_nav_url[0]);
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
