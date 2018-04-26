const crypto = require("crypto");
//degree in importantData
module.exports={
  //password +frequency safetyCode
  md5:(psw,degree,Scode)=>{
    let ciphertext = crypto.createHash("md5").update(psw+Scode).digest("hex");//1
    // console.log(psw+Scode);
    // console.log("开始"+ciphertext);
    for(let i = 0; i < degree;i++){
      ciphertext = crypto.createHash("md5").update(ciphertext).digest("hex");
      // console.log(i+"次"+ciphertext);

    }
    return ciphertext;
  }
};
// console.log(crypto.createHash("md5").update("123456").digest("hex"));
