module.exports=(express,qyking)=>{
  let router=express.Router();

  //No entry   //all in
  router.use((req,res,next)=>{
    if(!req.session["admin_id"] && req.url != qyking.com.admin_login_2+".html")
      res.redirect("/wtf.html");
    else
      next();
  })
  
  //login
  router.get(qyking.com.admin_login_2+".html",(req, res)=>{
    res.send('admin success').end();
  });
  // router.get('/',(req, res)=>{
  //   res.send('success').end();
  // });




  return router;
};


///by-qy 2018
