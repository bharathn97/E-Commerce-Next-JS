import User from "../../models/User"; // Assuming User is your mongoose model for users
import connectDb from "../../middleware/mongoose";
var CryptoJS=require("crypto-js")
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const {name,email}=req.body;

    let u = new User({name,email,password:CryptoJS.AES.encrypt(req.body.password,"Sexyboi69").toString()});
    await u.save();

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
