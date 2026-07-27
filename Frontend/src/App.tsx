import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import BookDetails from "./components/BookDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import { RootState } from "./store";
import Favourite from "./components/Favourite";
import OrderHistory from "./components/OrderHistory";
import Settings from "./components/Settings";
import Wishlist from "./components/WishList";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);


  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      const role = localStorage.getItem("role");
      if (role) {
        dispatch(authActions.changeRole(role));
      }
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-purple-400">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} >
          <Route index element ={<Favourite />}/>
          <Route path="/profile/orderhistory" element ={<OrderHistory />}/>
          <Route path="/profile/settings" element ={<Settings />}/>
          <Route path="/profile/wishlist" element ={<Wishlist />}/>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-book-details/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
