import User from "../../models/User"; // Assuming User is your mongoose model for users
import connectDb from "../../middleware/mongoose";
var CryptoJS=require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let user=await User.findOne({"email":req.body.email});
    if(user){
      const bytes=CryptoJS.AES.decrypt(user.password,"Sexyboi69");
       var originalText = bytes.toString(CryptoJS.enc.Utf8);
       console.log(originalText)
    if(req.body.email===user.email &&  req.body.password===originalText)
    {
      var token = jwt.sign({email:user.email,name:user.name}, 'fuckme',{
        expiresIn:"2d"
      });
      res.status(200).json({success:true,token});
    }
    else{
      res.status(200).json({success:false,error:"Invalid Credentials"});
    }
  }
  else{
    res.status(200).json({success:false,error:"No user found"});
  }

  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
