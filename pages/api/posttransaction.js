// postransaction.js
import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Retrieve the orderId from the request body
      const { orderId } = req.body;

      // Update the order status to "Success" in the database
      const updatedOrder = await Order.findOneAndUpdate({ orderId }, { status: "Paid" });
      if (updatedOrder) {
        console.log("Order status updated successfully");
                // Redirect to "/order" page
                res.redirect("/order");
      } else {
        console.error("Failed to update order status");
        res.status(500).json({ success: false, error: "Failed to update order status" });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ success: false, error: "Error updating order status" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
