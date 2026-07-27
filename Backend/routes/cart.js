const router = require("express").Router();
const User = require("../models/user.js");
const { authenticateToken } = require("./userAuth.js");

//sepete ekle
router.put("/add-cart", authenticateToken, async (req, res) => {
    try {
        const {id, bookid} = req.headers;
        const userData = await User.findById(id);
        const isAddedCart = userData.cart.includes(bookid)
        if (isAddedCart){
            return res.json({
                status: "success",
                message: "Book is already in cart.",
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: {cart: bookid},
        });

        return res.json({
            status: "Success",
            message: "Book added to cart",
        });

    } catch (error) {
        return res.status(500).json({message: "An error occured."});
    }
    
})

//sepetten sil
router.delete("/remove-from-cart/:bookid", authenticateToken, async (req,res) => {
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id,
            {
                $pull: {cart: bookid},
            }
        )
        return res.json({status: "success", message: "Book removed from cart",});
    } catch (error) {
        return res.status(500).json({message: "An error occurred"})
    }

})

router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({status: "success", data: cart,});

    } catch (error) {
        return res.status(500).json({message: "An error occurred"})

    }
})
module.exports = router;