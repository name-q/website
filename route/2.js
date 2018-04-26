module.exports=(express)=>{
  var router=express.Router();

  router.get('/a.html',(req, res)=>{
    res.send('asuccess').end();
  });
  router.get('/b.html',(req, res)=>{
    res.send('bsuccess').end();
  });

  return router;
};
