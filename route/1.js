module.exports=(express)=>{
  var router=express.Router();

  router.get('/1.html',(req, res)=>{
    res.send('1success').end();
  });
  router.get('/2.html',(req, res)=>{
    res.send('2success').end();
  });

  return router;
};
