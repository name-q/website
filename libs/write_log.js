// index.js

let fs = require('fs');

let options = {
  flags: 'a',     // append模式
  encoding: 'utf8',  // utf8编码
};

let success = fs.createWriteStream('./log/success.log', options);
let error = fs.createWriteStream('./log/error.log', options);

// 创建logger
let log= new console.Console(success, error);

// 添加format方法
Date.prototype.format = function (format) {

  if (!format) {
    format = 'yyyy-MM-dd HH:mm:ss';
  }

  // 用0补齐指定位数
  let padNum = function (value, digits) {
    return Array(digits - value.toString().length + 1).join('0') + value;
  };

  // 指定格式字符
  let cfg = {
    yyyy: this.getFullYear(),             // 年
    MM: padNum(this.getMonth() + 1, 2),        // 月
    dd: padNum(this.getDate(), 2),           // 日
    HH: padNum(this.getHours(), 2),          // 时
    mm: padNum(this.getMinutes(), 2),         // 分
    ss: padNum(this.getSeconds(), 2),         // 秒
    fff: padNum(this.getMilliseconds(), 3),      // 毫秒
  };

  return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
    return cfg[m];
  });
}


  let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
///___

  module.exports={
    success:(value)=>{
    log.log(`[${time}] - success message |${value}`);},

    error:(value)=>{
    log.error(`[${time}] - error message |${value}`);}
  }
