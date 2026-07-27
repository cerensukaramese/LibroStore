const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth.js")

//kayıt
router.post("/register", async (req,res) => {
    try {
        const {username, email, password, addres } = req.body
        if(username.length < 4){
            return res
            .status(400)
            .json({message: "Username length should be greater than 3."})
        }

        const existingUsername = await User.findOne({username: username}); 
        if (existingUsername){
            return res
            .status(400)
            .json({message: "Username already exists."})
        }

        const existingEmail = await User.findOne({email: email}); 
        if (existingEmail){
            return res
            .status(400)    
            .json({message: "email already exists."});
        }

        if(password.length <= 5){
            return res
            .status(400)
            .json({message: "password must be longer than 4 characters"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username : username,
            email: email,
            password: hashedPassword,
            addres: addres,
        })
        await newUser.save();
        return res.status(200).json({message:"Registered succesfully."})
        } catch (error) {
        res.status(500).json({message:"Internal server error." });
        }
}
      
);

//giriş
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await  User.findOne({ username });
        if(!existingUser)
        {
        return res.status(400).json({message: "This user doesn't exist."});
        }

        await bcrypt.compare(password, existingUser.password, ( err, data ) => {
            if(data) {
                const authClaims =[
                    {name: existingUser.username}, {role: existingUser.role}
                ]
                const token = jwt.sign({authClaims},process.env.JWT_SECRET, {
                    expiresIn: "30d",
                })
               return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
            }else {
                return res.status(400).json({message: "Wrong password."});
            }
        }

        )
    } catch (error) {
        return res.status(500).json({message: "Internal server error."});
    }
})

//user-info al
router.get("/get-user-info", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
    
})
router.post('/change-password', authenticateToken, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const {id} = req.headers
      const user = await User.findById(id);
      
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
//adres güncelleme
router.put("/update-address", authenticateToken , async (req, res) => {
    try {
        const { id } = req.headers;
        const { addres } = req.body;
        await User.findByIdAndUpdate(id,{addres: addres});
        return res.status(200).json({message: "Address updated successfully."})
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
    
})
module.exports = router;