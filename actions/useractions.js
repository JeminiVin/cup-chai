"use server"; // ✅ ensures server-side execution only

import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import Payment from "@/models/Payment";
import Username from "@/app/[username]/page";
import User from "@/models/User";

export async function initiate(amount, to_username, paymentform) {
  await connectDB();
  let user = await User.findOne({ username: to_username })
  const secret = user.razorpaysecret
  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  const options = {
    amount: parseInt(amount),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  await Payment.create({
    oid: order.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return order;
}


export const fetchuser = async (username) => {
  await connectDB()
  console.log(username)
  let u = await User.findOne({ username: username })
  let user = u.toObject({ flattenObjectIds: true })
  return user

}

export const fetchpayments = async (username) => {
  await connectDB()
  //find all payments sorted by decreasing order of amount
  let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(2).lean()
  return p
}

export const updateProfile = async (data, oldusername) => {
  await connectDB()
  let ndata = Object.fromEntries(data)
  //if the username is being updated, check if username is available 
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username })
    if (u) {
      return { error: "username already exists" }
    }
    await User.updateOne({ email: ndata.email }, ndata)

    await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
  }
  else{
        await User.updateOne({ email: ndata.email }, ndata)
  }
  

}
