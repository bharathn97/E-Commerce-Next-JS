const mongoose = require('mongoose');


const OrderSchema=new mongoose.Schema({
   email:{type:String,required:true},
   orderId:{type:String,required:true},
   products:{
        type:Object,
        default:""},
   address:{type:String,required:true},
    amount:{type:Number,required:true},
   status:{type:String,default:"Pending",required:true}
},{timestamps:true});
mongoose.models= {};
export default mongoose.model("Order",OrderSchema)||mongoose.model.Order;
