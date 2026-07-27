const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js")
const { authenticateToken } = require("./userAuth.js")

//kitap ekle:admin yapabilir
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id.toString());
        if (user.role !== "admin"){
            return res.status(400).json({message:"You can't access." });
        }
        const book  = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({message: "book added successfully."});
    } catch (error) {
        res.status(500).json({message:"Internal server error." });
    }
    
})

//kitap güncelleme-admin
router.post("/update-book", authenticateToken, async (req,res) => {
    try {
        const user = await User.findById(id.toString());
        if (user.role !== "admin"){
            return res.status(400).json({message:"You can't access." });
        }
        const { bookid } = req.headers
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        })

        return res.status(200).json({message: "book updated successfully."})
    } catch (error) {
        return res.status(500).json({message: "An error occured."})
    }
    
})

//kitap silme-admin
router.delete('/delete-book',authenticateToken ,async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const user = await User.findById(id.toString());
        if (user.role !== "admin"){
            return res.status(400).json({message:"You can't access." });
        }
        const result = await Book.findByIdAndDelete(bookid);
        if (result) {
            res.status(200).send('Book deleted successfully');
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/get-recent-books",async (req,res) => {
    try {
        const books = await Book.find().sort({ createedAt: -1}).limit(4)
        return res.json({
            status:"success",
            data: books,
        })
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
    
})

//kitapları listele
router.get('/get-all-books' ,async (req,res) => 
{
    try {
        const books = await Book.find().sort({createdAt: -1});
        return res.json({status:"success", data: books})
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }   
} )

router.get('/get-book-by-id/:id' ,async (req, res) => 
    {
        try {
            const { id } = req.params;
            const books = await Book.findById(id);
            return res.json({status:"success", data: books})
        } catch (error) {
            return res.status(500).json({message: "Internal server error."})
        }   
    } )

module.exports = router;