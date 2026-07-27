const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const Book = require("./routes/book")
const User = require("./routes/user")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")
const wishlistRoutes = require('./routes/wishlist');
const reviewRoutes = require('./routes/review');

app.use('/api/v1', wishlistRoutes);
app.use('/api/v1', reviewRoutes);
app.use("/api/v1",Cart)
app.use("/api/v1",Favourite)
app.use("/api/v1",User)
app.use("/api/v1",Book)
app.use("/api/v1",Order)
app.listen(process.env.PORT || 3000 , () =>  {
    console.log(`Server Started at port ${process.env.PORT}`);
});
