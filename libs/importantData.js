///Don't change it easily
var sess_key = [];
for(let i = 0;i<100000;i++){sess_key.push("qy_"+Math.random());};

///data///
const com={
www_static:"./www_static",
www_port:80,
// upload_port:8081,
upload_home:"./www_static/use_upload/",
up_file_ok:["png","jpg","txt","tif"],//Allowed upload file suffix
cookie_key:"qyking",
session_bye:20,//Minute
session_key:sess_key
}


module.exports = {com};






///by-qy 2018
