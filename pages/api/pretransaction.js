import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const order = new Order({
        email: req.body.email,
        orderId: req.body.oid,
        address: req.body.address,
        amount: req.body.subTotal,
        products: req.body.cart,
      });
      await order.save();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ success: false, error: 'Error creating order' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default connectDb(handler);
