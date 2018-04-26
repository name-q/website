module.exports=(express)=>{
  let router=express.Router();

  router.get('/',(req, res)=>{
    res.send('myweb').end();
  });
  router.get('/2.html',(req, res)=>{
    res.send('2success').end();
  });

  return router;
};
