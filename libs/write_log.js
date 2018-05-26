

let fs = require('fs');



let success = fs.createWriteStream('./log/success.log', {flags: 'a',encoding: 'utf8'});
let error = fs.createWriteStream('./log/error.log', {flags: 'a',encoding: 'utf8'});


let qy= new console.Console(success, error);


Date.prototype.format = function (format) {

  let padNum = function (value, digits) {
    return Array(digits - value.toString().length + 1).join('0') + value;
  };


  let cfg = {
    yyyy: this.getFullYear(),             // 年
    MM: padNum(this.getMonth() + 1, 2),        // 月
    dd: padNum(this.getDate(), 2),           // 日
    HH: padNum(this.getHours(), 2),          // 时
    mm: padNum(this.getMinutes(), 2),         // 分
    ss: padNum(this.getSeconds(), 2),         // 秒
  };

  return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
    return cfg[m];
  });
}


  function getNewTime(){
    return new Date().format('yyyy-MM-dd HH:mm:ss');
  }



  module.exports={
    success:(value)=>{
      qy.log(`[${getNewTime()}] - success |${value}`);},

    error:(value)=>{
      qy.error(`[${getNewTime()}] - error |${value}`);}
  }
