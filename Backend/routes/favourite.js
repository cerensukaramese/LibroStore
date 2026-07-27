const router = require("express").Router();
const User = require("../models/user.js");
const { authenticateToken } = require("./userAuth.js")

//favorilere ekleme
router.put("/adding-favourite", authenticateToken, async (req, res) => {
    try {
        const {bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isFavourite = userData.favourites.includes(bookid);
        if (isFavourite) {
            return res.status(200).json({message: "book is already favourited."})
        }
        await User.findByIdAndUpdate(id, {$push: {favourites: bookid}})
        return res.status(200).json({message: "successfully favourited."})
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
})

router.delete("/remove-favourite", authenticateToken, async (req, res) => {
    try {
        const {bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isFavourite = userData.favourites.includes(bookid);
        if (!isFavourite) {
            return res.status(200).json({message: "book is not favourited."})
        }
        await User.findByIdAndUpdate(id, {$pull: {favourites: bookid}})
        return res.status(200).json({message: "successfully removed from favourites."})
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
    
})

router.get("/get-favourites", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites"); 
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ favourites: userData.favourites });
    } catch (error) {
        console.error("Error fetching favourites:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;