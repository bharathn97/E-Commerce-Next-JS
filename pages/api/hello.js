// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Prodcut from "../../models/Product"
import connectDb from "../../middleware/mongoose"
const handler=async(req, res) =>{
  let products =await Product.find();
  res.status(200).json({ products })
}
export default connectDb(handler);
