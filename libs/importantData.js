///Don't change it easily
var sess_key = [];
for(let i = 0;i<100000;i++){sess_key.push("qy_"+Math.random());};

///data///
const com={
www_static:"./www_static",
admin_login_1:"/admin",//admin login url = admin_login_1 + admin_login_2
admin_login_2:"/login/keys", //Column as the current default path is http://localhost:80/admin/login/keys.html
www_port:80,
admin_login_post_key:"/ThisIsAdminLoginPostDataUrl",//Need to be modified//Follow the URL address rules//☆★Be sure to keep it confidential
// upload_port:8081,
upload_home:"./www_static/use_upload/",
up_file_ok:["png","jpg","txt","tif"],//Allowed upload file suffix

//Backstage Navigation  ///The following three array are interrelated
ad_nav_name:    ["轮播图"    , "博客"     ,  "联系我们"  ,  "评价"        ,  "产品"     ,  "留言"      ,  "新闻"    ],
ad_nav_title:   ["banners"  ,  "blog"    ,  "contact"   ,  "evaluate"   ,  "product"  ,  "message"  ,   "news"   ],
ad_nav_url:     ["/banners" ,  "/blog"   ,  "/contact"  ,   "/evaluate" ,  "/product" ,  "/message" ,    "/news" ],

//database->
db_host:"localhost",
database_name:"qone",
db_use:"root",
db_password:"123456",
//database over

//☆★Can only be modified before the service is opened☆★  Remember-Remember-Remember
safety_code:"qy^k*i%n&g)#$?切勿泄露注意注释",
degree:2, //Security level of the password =>default is 2=>!!! number↑ CPU-pressure↑!!!
cookie_key:"qyking",
session_bye:20,//Minute
session_key:sess_key
}


module.exports = {com};






///by-qy 2018
