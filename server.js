const exp = require("express");
const sta = require("express-static");
const coo = require("cookie-parser");
const ses = require("cookie-session");
const mys = require("mysql");
const con = require("consolidate");
const rou = require("express-route");
const bod = require("body-parser");
// const mul = require("multer");
//libs
const Q_da = require("./libs/importantData");
// const Q_up = require("./libs/upload");


//server
var ser = exp();
ser.listen(Q_da.com.www_port);

///get value
//file`
ser.use(bod.urlencoded({extended:false}));
// Q_up.post_file(mul,exp,ser,Q_da);



//get cookie session
ser.use(coo(Q_da.com.cookie_key));
ser.use(ses({
  name:"Q_sess",
  keys:Q_da.com.session_key,
  maxAge:Q_da.com.session_bye*60*1000
}));

//module www
ser.set("view engine","html");
ser.set("views","www_mod");
ser.engine("html",con.ejs);


//route
ser.use('/', require('./route/use/roo.js')(exp));
//admin login route
ser.use(Q_da.com.admin_login_1, require('./route/adm/ad_lo.js')(exp,Q_da));
// ser.use('/a/', require('./route/1.js')(exp));
// ser.use('/b/', require('./route/2.js')(exp));
//static
ser.use(sta(Q_da.com.www_static));
