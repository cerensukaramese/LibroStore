const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user")

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const {order } = req.body;
        for(const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id})
            const orderDatadb = await newOrder.save();
            await User.findByIdAndUpdate(id, {$push: {orders: orderDatadb._id},})
            await User.findByIdAndUpdate(id, {$pull: {cart: orderData._id },})
        }
        
        return res.json({status: "success", message: "Order placed succesfully.",})

    } catch (error) {
        return res.status(500).json({message: "An error occurred."})
    }
})

router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        })
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: ordersData,
        })
    } catch (error) {
        return res.status(500).json({message: "An error occurred."})
    }
})

//admin-- bütüm siparişler
router.get("/get-all-orders", authenticateToken, async (req,res) => {
    try {
        const userData = await Order.find()
        .populate({
            path:"book",
        })
        .populate({
            path: "user",
        }).sort({createdAt: -1})
        return res.json({
            status: "success",
            data: userData,
        })
    } catch (error) {
        return res.status(500).json({message: "An error occurred."})
    }
})

//sipariş durumu güncelle -admin
router.put("/update-status/:id",authenticateToken, async (res, req) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, {
            status: req.body.status 
        })
        return res.json({
            status: "success",
            message: "Status updated successfully.",
        })
    } catch (error) {
        return res.status(500).json({message: "An error occurred."})
    }
})
module.exports = router;