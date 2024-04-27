const { JSON } = require("express");
const Razorpay = require("razorpay");
const Order = require("../models/order");

const purchase = async (req, res) => {
  try {
    let rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      const orderdata = await req.user.createOrder({
        orderid: order.id,
        status: "PENDING",
      });
      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Something went wrong!", error: error });
  }
};

const updatePurchase = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    await order.update({ paymentid: payment_id, status: "SUCCESSFUL" });
    return res
      .status(202)
      .json({ sucess: true, message: "Transaction Successful!" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: error, message: "Something went wrong!" });
  }
};

module.exports = { purchase, updatePurchase };
